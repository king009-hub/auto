import fs from 'fs';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://enginemarkets.com';
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Supabase credentials missing in .env');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const staticPages = [
  '',
  '/products',
  '/contact',
  '/login',
  '/register',
  '/wishlist',
  '/cart'
];

async function generateSitemap() {
  console.log('Generating sitemap...');
  let urls: string[] = [];

  // 1. Add static pages
  staticPages.forEach(page => {
    urls.push(`${BASE_URL}${page}`);
  });

  // 2. Fetch Categories
  const { data: categories } = await supabase.from('categories').select('slug');
  if (categories) {
    categories.forEach(cat => {
      urls.push(`${BASE_URL}/products?category=${cat.slug}`);
    });
  }

  // 3. Fetch Brands
  const { data: brands } = await supabase.from('brands').select('name');
  if (brands) {
    brands.forEach(brand => {
      urls.push(`${BASE_URL}/products?brand=${encodeURIComponent(brand.name)}`);
    });
  }

  // 4. Fetch Products
  const { data: products } = await supabase.from('products').select('slug, id');
  if (products) {
    products.forEach(product => {
      urls.push(`${BASE_URL}/products/${product.slug || product.id}`);
    });
  }

  // 5. Add category + brand combinations (SEO gold)
  // We'll only do this for top categories to avoid a massive sitemap
  if (categories && brands) {
    categories.forEach(cat => {
      brands.slice(0, 15).forEach(brand => { // Limit to top 15 brands per category
        urls.push(`${BASE_URL}/products?category=${cat.slug}&brand=${encodeURIComponent(brand.name)}`);
      });
    });
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === BASE_URL ? '1.0' : url.includes('/products/') ? '0.7' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log(`Successfully generated sitemap.xml with ${urls.length} URLs in public/sitemap.xml`);
}

generateSitemap().catch(err => {
  console.error('Error generating sitemap:', err);
  process.exit(1);
});

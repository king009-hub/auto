import fs from 'fs';

const BASE_URL = 'https://enginemarkets.com';

const categories = [
  { name: 'Gearboxes', slug: 'gearboxes' },
  { name: 'Turbo Parts', slug: 'turbo-parts' },
  { name: 'Engine Parts', slug: 'engine-parts' },
  { name: 'Engines', slug: 'engines' },
  { name: 'Compressors', slug: 'compressors' },
  { name: 'Electric Motors', slug: 'electric-motors' },
  { name: 'Turbocharger Rebuild Kits', slug: 'turbocharger-rebuild-kits' },
  { name: 'Injectors', slug: 'injectors' }
];

const brands = [
  'Toyota', 'Audi', 'Rover', 'Man', 'BMW', 'Mercedes', 'Mini', 'Hyundai', 'Renault', 'Suzuki', 
  'Fiat', 'Ford', 'Kia', 'Peugeot', 'Jaguar', 'Land Rover', 'Volvo', 'Alfa Romeo', 'Isuzu', 
  'Iveco', 'Nissan', 'Subaru', 'Opel', 'Citroen', 'Honda', 'Jeep', 'Porsche', 'Mitsubishi', 'Seat'
];

const staticPages = [
  '',
  '/products',
  '/contact',
  '/login',
  '/register',
  '/wishlist',
  '/cart'
];

function generateSitemap() {
  let urls: string[] = [];

  // Add static pages
  staticPages.forEach(page => {
    urls.push(`${BASE_URL}${page}`);
  });

  // Add category pages
  categories.forEach(cat => {
    urls.push(`${BASE_URL}/products?category=${cat.slug}`);
  });

  // Add brand pages
  brands.forEach(brand => {
    const brandSlug = brand.toLowerCase().replace(/\s+/g, '-');
    urls.push(`${BASE_URL}/products?brand=${brandSlug}`);
  });

  // Add category + brand combinations (SEO gold)
  categories.forEach(cat => {
    brands.forEach(brand => {
      const brandSlug = brand.toLowerCase().replace(/\s+/g, '-');
      urls.push(`${BASE_URL}/products?category=${cat.slug}&brand=${brandSlug}`);
    });
  });

  // No need for individual products if we don't have IDs yet,
  // the categories/brands are better for SEO keywords anyway.

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</url>
    <changefreq>weekly</changefreq>
    <priority>${url === BASE_URL ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log(`Generated sitemap.xml with ${urls.length} URLs in public/sitemap.xml`);
}

generateSitemap();

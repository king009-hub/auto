import fs from 'fs';

interface Product {
  name: string;
  description: string;
  brand: string;
  fuel_type: string;
  engine_code: string;
  price: number;
  mileage: number;
  year: number;
  condition: string;
  compatibility: string[];
  images: string[];
  category_id: string;
  availability: boolean;
}

const products: Product[] = JSON.parse(fs.readFileSync('prepared-products.json', 'utf8'));

function escapeSql(str: string) {
  return str.replace(/'/g, "''");
}

let sql = '-- SQL Script to upload products to Supabase\n';
sql += '-- Copy and paste this into the Supabase SQL Editor\n\n';

// Batch into groups of 50 to avoid any single statement limits
const batchSize = 50;
for (let i = 0; i < products.length; i += batchSize) {
  const batch = products.slice(i, i + batchSize);
  
  sql += 'INSERT INTO public.products (name, description, brand, fuel_type, engine_code, price, mileage, year, condition, compatibility, images, category_id, availability)\nVALUES\n';
  
  const values = batch.map(p => {
    const name = escapeSql(p.name);
    const description = escapeSql(p.description);
    const brand = escapeSql(p.brand);
    const fuelType = escapeSql(p.fuel_type);
    const engineCode = escapeSql(p.engine_code);
    const condition = escapeSql(p.condition);
    const compatibility = JSON.stringify(p.compatibility).replace(/'/g, "''");
    const images = JSON.stringify(p.images).replace(/'/g, "''");
    
    return `('${name}', '${description}', '${brand}', '${fuelType}', '${engineCode}', ${p.price}, ${p.mileage}, ${p.year}, '${condition}', '${compatibility}'::jsonb, '${images}'::jsonb, '${p.category_id}', ${p.availability})`;
  });

  sql += values.join(',\n') + ';\n\n';
}

fs.writeFileSync('products-upload.sql', sql);
console.log(`Generated SQL for ${products.length} products in products-upload.sql`);

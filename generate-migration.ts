import fs from 'fs';

function generateSql() {
  const products = JSON.parse(fs.readFileSync('generated-products.json', 'utf8'));
  let sql = '-- Bulk insert products from images\n';
  
  // Split into smaller chunks to avoid large transaction issues
  const chunkSize = 100;
  for (let i = 0; i < products.length; i += chunkSize) {
    const chunk = products.slice(i, i + chunkSize);
    sql += 'INSERT INTO public.products (name, description, brand, fuel_type, engine_code, price, mileage, year, condition, compatibility, images, category_id, availability) VALUES\n';
    
    const values = chunk.map(p => {
      const name = p.name.replace(/'/g, "''");
      const description = p.description.replace(/'/g, "''");
      const brand = p.brand.replace(/'/g, "''");
      const engineCode = p.engine_code.replace(/'/g, "''");
      const condition = p.condition.replace(/'/g, "''");
      const compatibility = `ARRAY[${p.compatibility.map((c: string) => `'${c.replace(/'/g, "''")}'`).join(',')}]`;
      const images = `ARRAY[${p.images.map((img: string) => `'${img.replace(/'/g, "''")}'`).join(',')}]`;
      const categoryId = p.category_id ? `'${p.category_id}'` : 'NULL';
      
      return `  ('${name}', '${description}', '${brand}', '${p.fuel_type}', '${engineCode}', ${p.price}, ${p.mileage}, ${p.year}, '${condition}', ${compatibility}, ${images}, ${categoryId}, ${p.availability})`;
    });
    
    sql += values.join(',\n') + ';\n\n';
  }
  
  fs.writeFileSync('supabase/migrations/20260322101553_bulk_products.sql', sql);
  console.log(`Generated SQL migration with ${products.length} products.`);
}

generateSql();

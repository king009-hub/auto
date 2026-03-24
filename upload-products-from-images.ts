import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const imagesDir = path.join('public', 'images');

const categoriesMap: Record<string, string> = {
  'Boites à vitesses': 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c',
  'CHRA cartridges': '16490fcf-fdf1-483b-b2bd-df61aea9a8a8',
  'Compresseurs': '0f7e1dab-1864-4e3a-aaa3-43da8cfea490',
  'Kits réfection turbo': '62b9a11b-16de-4563-9ee5-a066a76cecbd',
  'Moteurs': 'b72acdc6-f680-4fc0-9d05-a0568a244ceb',
  'Piéces Moteurs': '8d457139-63c9-44a5-9533-6f4adda1efde',
  'Piéces turbo': '16490fcf-fdf1-483b-b2bd-df61aea9a8a8',
};

const knownBrands = [
  'Renault', 'Nissan', 'Mercedes', 'Volvo', 'Jeep', 'Toyota', 'VW', 'BMW', 'Audi', 'Fiat', 'Ford', 
  'Opel', 'Peugeot', 'Citroen', 'Mazda', 'Honda', 'Hyundai', 'Kia', 'Skoda', 'Seat', 'Mitsubishi', 
  'Land Rover', 'Porsche', 'Volkswagen', 'Rover', 'Alfa Romeo', 'Lancia', 'Dacia', 'Subaru', 'Suzuki',
  'Isuzu', 'Iveco', 'Man', 'Scania', 'DAF', 'Mini', 'Jaguar', 'Lexus', 'Chrysler', 'Dodge', 'Smart'
];

function getBrand(text: string) {
  const normalized = text.toLowerCase();
  for (const brand of knownBrands) {
    if (normalized.includes(brand.toLowerCase())) return brand;
  }
  return 'Generic';
}

function cleanName(filename: string) {
  return filename
    .replace(/\.(jpg|jpeg|png|svg)$/i, '')
    .replace(/\s*\((\d+)\)$/, '') // remove (1), (2)
    .replace(/\s*_\d+$/, '')      // remove _1, _2
    .replace(/\s+\d+$/, '')      // remove  1,  2
    .trim();
}

async function main() {
  const folders = fs.readdirSync(imagesDir);
  const products: any[] = [];

  for (const folder of folders) {
    const folderPath = path.join(imagesDir, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const catKey = Object.keys(categoriesMap).find(key => folder.includes(key));
    if (!catKey) continue;
    const categoryId = categoriesMap[catKey];

    const files = fs.readdirSync(folderPath).filter(f => f.match(/\.(jpg|jpeg|png|svg)$/i));
    
    // Group files by product
    const productGroups: Record<string, string[]> = {};
    for (const file of files) {
      const baseName = cleanName(file);
      if (!productGroups[baseName]) productGroups[baseName] = [];
      productGroups[baseName].push(`/images/${folder}/${file}`);
    }

    for (const [name, images] of Object.entries(productGroups)) {
      if (name.toLowerCase().includes('close') || name.toLowerCase().includes('24px')) continue;

      const brand = getBrand(name);
      
      // Default prices based on category
      let price = 500;
      if (catKey.includes('Moteurs')) price = 1500;
      if (catKey.includes('Boites')) price = 800;
      if (catKey.includes('turbo')) price = 300;
      if (catKey.includes('Piéces')) price = 150;

      products.push({
        name: name,
        description: `High quality ${catKey} for ${brand} vehicles. Tested and verified.`,
        brand: brand,
        fuel_type: 'Diesel', // Default
        engine_code: name.split(' ')[0], // Assume first part is engine code
        price: price,
        mileage: Math.floor(Math.random() * 150000) + 10000,
        year: Math.floor(Math.random() * 15) + 2010,
        condition: 'Tested - OK',
        compatibility: [brand],
        images: images,
        category_id: categoryId,
        availability: true
      });
    }
  }

  /*
  console.log('Signing in as admin...');
  ...
  */

  console.log(`Prepared ${products.length} products. Saving to prepared-products.json...`);
  fs.writeFileSync('prepared-products.json', JSON.stringify(products, null, 2));
  console.log('Finished saving products.');
}

main().catch(console.error);

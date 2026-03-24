import fs from 'fs';
import path from 'path';

const categoriesMap: Record<string, string> = {
  'Boites à vitesses': 'd9af257c-c611-4bfb-9fcc-a4e1c86f600c', // Gearboxes
  'CHRA cartridges': '16490fcf-fdf1-483b-b2bd-df61aea9a8a8', // Turbo Parts
  'Compresseurs': '8d457139-63c9-44a5-9533-6f4adda1efde', // Engine Parts
  'Kits réfection turbo': '62b9a11b-16de-4563-9ee5-a066a76cecbd', // Turbo Kits
  'Moteurs': 'b72acdc6-f680-4fc0-9d05-a0568a244ceb', // Engines
};

const brands = [
  'Renault', 'Nissan', 'Mercedes', 'Volvo', 'Jeep', 'Toyota', 'VW', 'BMW', 'Audi', 'Fiat', 'Ford', 
  'Opel', 'Peugeot', 'Citroen', 'Mazda', 'Honda', 'Hyundai', 'Kia', 'Skoda', 'Seat', 'Mitsubishi', 
  'Land Rover', 'Porsche', 'Volkswagen', 'Rover', 'Alfa Romeo', 'Lancia', 'Dacia', 'Subaru', 'Suzuki',
  'Isuzu', 'Iveco', 'Man', 'Scania', 'DAF', 'Mini', 'Jaguar', 'Lexus', 'Chrysler', 'Dodge', 'Smart'
];

const imagesDir = path.join('public', 'images');

function getBrand(text: string) {
  const normalized = text.toLowerCase();
  for (const brand of brands) {
    if (normalized.includes(brand.toLowerCase())) return brand;
  }
  return 'Generic';
}

function processImages() {
  const products: any[] = [];
  const folders = fs.readdirSync(imagesDir);

  for (const folder of folders) {
    const folderPath = path.join(imagesDir, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const categoryId = Object.keys(categoriesMap).find(key => folder.includes(key));
    if (!categoryId) continue;

    const files = fs.readdirSync(folderPath);
    const groups: Record<string, string[]> = {};

    for (const file of files) {
      if (!file.match(/\.(jpg|jpeg|png|svg)$/i)) continue;
      
      // Basic grouping: remove extension and trailing numbers
      const name = file.replace(/\.[^/.]+$/, '').replace(/\s+\d+$/, '').trim();
      if (!groups[name]) groups[name] = [];
      groups[name].push(`/images/${folder}/${file}`);
    }

    for (const [name, imageUrls] of Object.entries(groups)) {
      const brand = getBrand(name) === 'Generic' ? getBrand(folder) : getBrand(name);
      const fuelType = name.toLowerCase().includes('tdi') || name.toLowerCase().includes('dci') || name.toLowerCase().includes('hdi') ? 'Diesel' : 'Petrol';
      
      products.push({
        name: `${brand} ${name}`,
        description: `High quality ${folder.split(' - ')[0]} for ${brand} vehicles. Tested and verified.`,
        brand,
        fuel_type: fuelType,
        engine_code: name.split(' ')[0], // Best guess for engine code
        price: Math.floor(Math.random() * (2000 - 20 + 1) + 20),
        mileage: Math.floor(Math.random() * 150000),
        year: Math.floor(Math.random() * (2024 - 2010 + 1) + 2010),
        condition: 'Used - Excellent',
        compatibility: [brand],
        images: imageUrls,
        category_id: categoriesMap[categoryId],
        availability: true,
      });
    }
  }

  return products;
}

const products = processImages();
fs.writeFileSync('generated-products.json', JSON.stringify(products, null, 2));
console.log(`Generated ${products.length} products.`);

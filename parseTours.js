const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('tours.html', 'utf8');
const $ = cheerio.load(html);

const packages = [];
$('.col-md-4').each((i, el) => {
  const img = $(el).find('img').attr('src');
  const title = $(el).find('h4').text().trim();
  const priceText = $(el).find('p').filter((_, p) => $(p).text().includes('Starts from')).text().trim();
  const link = $(el).find('a.btn-info').attr('href');
  
  if (title && priceText) {
    const priceMatch = priceText.match(/Starts from\s+([\d]+)\/-/);
    const durationMatch = priceText.match(/(\d+)\s+Day/);
    
    packages.push({
      id: i,
      title: title,
      img: img ? (img.startsWith('http') ? img : `https://www.greensrentacab.com/${img}`) : '',
      price: priceMatch ? `₹${priceMatch[1]}` : '',
      duration: durationMatch ? `${durationMatch[1]} Days` : '',
      link: link
    });
  }
});

fs.writeFileSync('tours.json', JSON.stringify(packages, null, 2));
console.log(`Saved ${packages.length} packages`);

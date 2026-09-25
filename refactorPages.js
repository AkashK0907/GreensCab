const fs = require('fs');

const mappings = {
    'app/fleet/page.tsx': { arrayName: 'allCars', key: 'fleet' },
    'app/airport/page.tsx': { arrayName: 'airportTaxis', key: 'airport' },
    'app/local-rental/page.tsx': { arrayName: 'localTaxis', key: 'local' },
    'app/outstation/page.tsx': { arrayName: 'outstationTaxis', key: 'outstation' },
    'app/tours/page.tsx': { arrayName: 'tourPackages', key: 'tours' }
};

for (const [file, info] of Object.entries(mappings)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove the array definition
    const regex = new RegExp(`const ${info.arrayName} = \\[[\\s\\S]*?\\]\\n`, 'm');
    content = content.replace(regex, '');
    
    // Add import statement
    const importStatement = `\nimport contentData from '../../data/content.json'\nconst ${info.arrayName} = contentData.${info.key}\n`;
    content = content.replace(/(import .*?'lucide-react')\n/, `$1\n${importStatement}`);
    
    fs.writeFileSync(file, content);
}
console.log('Successfully refactored pages');

const fs = require('fs');

function extractArray(filePath, arrayName) {
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = new RegExp(`const ${arrayName} = (\\[[\\s\\S]*?\\])\\n`, 'm');
    const match = content.match(regex);
    if (match) {
        // Evaluate the matched string into a real array
        // We need to use eval safely, since it's our own code
        let arr;
        eval(`arr = ${match[1]}`);
        return arr;
    }
    return [];
}

const data = {
    fleet: extractArray('app/fleet/page.tsx', 'allCars'),
    airport: extractArray('app/airport/page.tsx', 'airportTaxis'),
    local: extractArray('app/local-rental/page.tsx', 'localTaxis'),
    outstation: extractArray('app/outstation/page.tsx', 'outstationTaxis'),
    tours: extractArray('app/tours/page.tsx', 'tourPackages')
};

fs.writeFileSync('data/content.json', JSON.stringify(data, null, 2));
console.log('Successfully extracted all data to data/content.json');

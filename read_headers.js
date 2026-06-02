const fs = require('fs');
const xlsx = require('xlsx');

const workbook = xlsx.readFile('DETAILS.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const rawData = xlsx.utils.sheet_to_json(worksheet, {header: 1});

let headerRowIndex = -1;
for (let i = 0; i < rawData.length; i++) {
    if (rawData[i] && rawData[i].some(cell => typeof cell === 'string' && (cell.includes('PolicyNo') || cell.includes('S.No')))) {
        headerRowIndex = i;
        break;
    }
}

if (headerRowIndex !== -1) {
    const headers = rawData[headerRowIndex].map(h => h ? h.trim() : '');
    fs.writeFileSync('headers_output.txt', headers.join('\n'));
} else {
    fs.writeFileSync('headers_output.txt', 'Header row not found');
}

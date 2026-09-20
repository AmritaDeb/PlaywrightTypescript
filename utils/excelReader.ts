import * as XLSX from 'xlsx';
import path from 'path';

export function readExcel(filePath : string, sheeName : string ){
    const fullPath = path.resolve(filePath);
    console.log('Full path is ', fullPath);

    const workbook = XLSX.readFile(fullPath);
    const sheet = workbook.Sheets[sheeName];
    const data = XLSX.utils.sheet_to_json(sheet);
    return data;
}

export default readExcel;
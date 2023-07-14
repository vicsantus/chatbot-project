import Papa from 'papaparse';

function MakeCSV(textData) {
    const csv = Papa.unparse(textData);
    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const csvURL = URL.createObjectURL(csvData);
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', `${Date.now()}.csv`);
    tempLink.click();
}

export default MakeCSV
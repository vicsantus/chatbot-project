import Papa from 'papaparse';

// Função para criar um arquivo CSV a partir dos dados fornecidos
function MakeCSV(textData) {
  // Usa a biblioteca PapaParse para converter o array de objetos em formato CSV
  const csv = Papa.unparse(textData);
  
  // Cria um novo objeto Blob com o CSV gerado, definindo o tipo como 'text/csv;charset=utf-8;'
  const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  // Cria uma URL temporária para o Blob criado
  const csvURL = URL.createObjectURL(csvData);

  // Cria um elemento 'a' temporário para simular um clique no link de download
  const tempLink = document.createElement('a');

  // Define o href do link temporário com a URL do CSV
  tempLink.href = csvURL;

  // Define o atributo 'download' para o link temporário, com um nome de arquivo baseado na data e hora atual
  tempLink.setAttribute('download', `${Date.now()}.csv`);

  // Simula um clique no link temporário, o que inicia o download do arquivo CSV
  tempLink.click();
}

export default MakeCSV;

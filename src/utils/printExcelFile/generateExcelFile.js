import * as XLSX from 'xlsx';
//=((E2*E$1) + (F2*F$1) + (G2*G$1) +(H2*H$1))

export default function generateExelFile({ printArray, activeSubject }) {
  const gradeWidth = 6

  // Crea una hoja de cálculo
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(printArray)

  worksheet["!cols"] = [
    { wch: 4 }, 
    { wch: 12 },
    { wch: 30 },
    { wch: 30 },
    { wch: gradeWidth }, 
    { wch: gradeWidth }, 
    { wch: gradeWidth }, 
    { wch: gradeWidth }, 
    { wch: gradeWidth }, 
    { wch: gradeWidth }, 
    { wch: gradeWidth }, 
    { wch: gradeWidth }, 
    { wch: gradeWidth }, 
    { wch: gradeWidth }
  ]; 

  // Agrega la hoja de cálculo al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista de Estudiantes');

  // Convierte el libro a un archivo binario
  const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

  // Crea un objeto Blob con el contenido binario
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Genera una URL para el objeto Blob
  const url = URL.createObjectURL(blob);

  // Crea un elemento <a> para iniciar la descarga
  const link = document.createElement('a');
  link.href = url;
  link.download = `${activeSubject} ${new Date()}.xlsx`;

  // Simula un clic en el enlace para iniciar la descarga
  link.click();

  // Libera la URL del objeto Blob
  URL.revokeObjectURL(url);
}


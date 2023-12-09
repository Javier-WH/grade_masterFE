import * as XLSX from 'xlsx';
//=((E2*E$1) + (F2*F$1) + (G2*G$1) +(H2*H$1))

export default function generateExelFile(printArray) {
  const gradeWidth = 6

  // Crea una hoja de cálculo
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(printArray)
  /*
  const worksheet = XLSX.utils.aoa_to_sheet([
    ['Matematicas, Primer año de Ciencias A'],
    ['Profesor: Francisco Javier Rodríguex Hernández, C.I. 16193765'],
    ['Primer Lapso'],
    [''],
    ['N°', 'C.I.', 'Nombres', 'Apellidos', '25%', '25%', '25%', '25%', "acc/def"],
    ['1', '1234567', 'John', 'Doe', '15', '10', '12', '16', {f:'=((E2*E$1) + (F2*F$1) + (G2*G$1) +(H2*H$1))'}],
    ['2', '2345678', 'Jane', 'Smith', '18', '9', '11', '20', { f: '=((E3*E$1) + (F3*F$1) + (G3*G$1) +(H3*H$1))' }],
    ['3', '3456789', 'Michael', 'Johnson', '14', '12', '13', '17', { f: '=((E4*E$1) + (F4*F$1) + (G4*G$1) +(H4*H$1))' }],
    ['4', '4567890', 'Emily', 'Williams', '11', '13', '16', '18', { f: '=((E5*E$1) + (F5*F$1) + (G5*G$1) +(H5*H$1))' }],
    ['5', '5678901', 'William', 'Brown', '17', '11', '15', '19', { f: '=((E6*E$1) + (F6*F$1) + (G6*G$1) +(H6*H$1))' }],
    ['6', '6789012', 'Emma', 'Jones', '16', '14', '10', '20', { f: '=((E7*E$1) + (F7*F$1) + (G7*G$1) +(H7*H$1))' }],
    ['7', '7890123', 'Daniel', 'Taylor', '13', '15', '14', '17', { f: '=((E8*E$1) + (F8*F$1) + (G8*G$1) +(H8*H$1))' }],
    ['8', '8901234', 'Olivia', 'Miller', '12', '16', '17', '19', { f: '=((E9*E$1) + (F9*F$1) + (G9*G$1) +(H9*H$1))' }],
    ['9', '9012345', 'Alexander', 'Anderson', '19', '8', '18', '15', { f: '=((E10*E$1) + (F10*F$1) + (G10*G$1) +(H10*H$1))' }],
    ['10', '0123456', 'Sophia', 'Wilson', '15', '17', '12', '20', { f: '=((E11*E$1) + (F11*F$1) + (G11*G$1) +(H11*H$1))' }],
    ['11', '0987654', 'Matthew', 'Clark', '10', '18', '11', '19', { f: '=((E12*E$1) + (F12*F$1) + (G12*G$1) +(H12*H$1))' }],
    ['12', '9876543', 'Ava', 'Martinez', '16', '13', '14', '20', { f: '=((E13*E$1) + (F13*F$1) + (G13*G$1) +(H13*H$1))' }],
    ['13', '8765432', 'James', 'Hernandez', '20', '12', '16', '18', { f: '=((E14*E$1) + (F14*F$1) + (G14*G$1) +(H14*H$1))' }],
    ['14', '7654321', 'Mia', 'Lopez', '14', '19', '13', '17', { f: '=((E15*E$1) + (F15*F$1) + (G15*G$1) +(H15*H$1))' }],
    ['15', '1234567', 'John', 'Doe', '15', '10', '12', '16', { f: '=((E16*E$1) + (F16*F$1) + (G16*G$1) +(H16*H$1))' }],
    ['16', '2345678', 'Jane', 'Smith', '18', '9', '11', '20', { f: '=((E17*E$1) + (F17*F$1) + (G17*G$1) +(H17*H$1))' }],
    ['17', '3456789', 'Michael', 'Johnson', '14', '12', '13', '17', { f: '=((E18*E$1) + (F18*F$1) + (G18*G$1) + (H18*H$1))' }],
    ['18', '4567890', 'Emily', 'Williams', '11', '13', '16', '18', { f: '=((E19*E$1) + (F19*F$1) + (G19*G$1) + (H19*H$1))' }],
    ['19', '5678901', 'William', 'Brown', '17', '11', '15', '19', { f: '=((E20*E$1) + (F20*F$1) + (G20*G$1) + (H20*H$1))' }],
    ['20', '6789012', 'Emma', 'Jones', '16', '14', '10', '20', { f: '=((E21*E$1) + (F21*F$1) + (G21*G$1) + (H21*H$1))' }],
    ['21', '7890123', 'Daniel', 'Taylor', '13', '15', '14', '17', { f: '=((E22*E$1) + (F22*F$1) + (G22*G$1) + (H22*H$1))' }],
    ['22', '8901234', 'Olivia', 'Miller', '12', '16', '17', '19', { f: '=((E23*E$1) + (F23*F$1) + (G23*G$1) + (H23*H$1))' }],
    ['23', '9012345', 'Alexander', 'Anderson', '19', '8', '18', '15', { f: '=((E24*E$1) + (F24*F$1) + (G24*G$1) + (H24*H$1))'}],
    ['24', '0123456', 'Sophia', 'Wilson', '15', '17', '12', '20', { f: '=((E25*E$1) + (F25*F$1) + (G25*G$1) +(H25*H$1))' }],
    ['25', '0987654', 'Matthew', 'Clark', '10', '18', '11', '19', { f: '=((E26*E$1) + (F26*F$1) + (G26*G$1) +(H26*H$1))' }],
    ['26', '9876543', 'Ava', 'Martinez', '16', '13', '14', '20', { f: '=((E27*E$1) + (F27*F$1) + (G27*G$1) +(H27*H$1))' }],
    ['27', '8765432', 'James', 'Hernandez', '20', '12', '16', '18', { f: '=((E28*E$1) + (F28*F$1) + (G28*G$1) +(H28*H$1))' }],
    ['28', '7654321', 'Mia', 'Lopez', '14', '19', '13', '17', { f: '=((E29*E$1) + (F29*F$1) + (G29*G$1) +(H29*H$1))' }],
    ['29', '5678901', 'William', 'Brown', '17', '11', '15', '19', { f: '=((E30*E$1) + (F30*F$1) + (G30*G$1) +(H30*H$1))' }],
    ['30', '6789012', 'Emma', 'Jones', '16', '14', '10', '20', { f: '=((E31*E$1) + (F31*F$1) + (G31*G$1) +(H31*H$1))' }],
    ['31', '0123456', 'Sophia', 'Wilson', '15', '17', '12', '20', { f: '=((E32*E$1) + (F32*F$1) + (G32*G$1) +(H32*H$1))' }],
  ]);
*/
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
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');

  // Convierte el libro a un archivo binario
  const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

  // Crea un objeto Blob con el contenido binario
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Genera una URL para el objeto Blob
  const url = URL.createObjectURL(blob);

  // Crea un elemento <a> para iniciar la descarga
  const link = document.createElement('a');
  link.href = url;
  link.download = 'usuarios.xlsx';

  // Simula un clic en el enlace para iniciar la descarga
  link.click();

  // Libera la URL del objeto Blob
  URL.revokeObjectURL(url);
}
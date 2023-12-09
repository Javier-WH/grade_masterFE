import generateExelFile from "./generateExcelFile.js"
let percents = []

export default function printExcelFile({ studentList, evalPlanList, activeEvalPlan, teacherData, activeSubject }){

  const teacerName = `Profesor: ${teacherData.lastName} ${teacherData.name}`
  const lapseid = evalPlanList[activeEvalPlan]?.idLapse
  let lapseName = ""

  const list = studentList.map(student =>{

    const {
      studentCi: ci,
      studentName,
      studentLastName,
      grades
    } = student

    const getLapseName = grades.filter(lapse => lapse.lapseid === lapseid)[0]?.lapseName
    lapseName = getLapseName ? getLapseName : lapseName
    
    const data = evalPlanList[activeEvalPlan]
    const per = []
    for (const key in data) {
      if (key.startsWith('per')) {
        per.push(data[key])
      }
    }
    percents = per.map(percent => percent+"%")



    const gradelist = []
    //el if previene un bug cuando un alumno tiene grades = undefined
    if (grades) {
      const evals = grades.filter(lapse => lapse.lapseid === lapseid)[0]?.evals

      if (evals) {
        for (let i = 1; i <= per.length; i++) {
          gradelist.push(evals['eval' + i] ? Number.parseFloat(evals['eval' + i]) : 0)
        }
      } else { // esto agrega celdas vacías si no tiene notas
        for (let i = 1; i <= per.length; i++) {
          gradelist.push(0)
        }
      }
    }

    return {
      ci,
      studentLastName,
      studentName,
      evals: gradelist
    }

  })


  const students = list.map((studen, i) =>{
    const evals = studen.evals
    const formulaCunks = evals.map((_, j)=>{
      const column = getColumn(j + 5)
      const row = i+6
      return `(${column}${row}*${column}$5)`
    })
    
    let formula = '=('

    for(let chunk of formulaCunks){
      formula += chunk + "+"
      
    }
    formula = formula.slice(0, -1);
    formula += ')'

    return [
      i+1,
      studen.ci,
      studen.studentName,
      studen.studentLastName,
      ...evals,
      { f: formula }
    ]
  })


  const printObject = [
    [activeSubject],
    [teacerName],
    [lapseName],
    [""],
    ['N°', 'C.I.', 'Nombres', 'Apellidos', ... percents, "acc/def"],
    ...students
  ]
  //console.log(printObject)
  generateExelFile(printObject)
  
}

function getColumn(number) {
  if (number < 1 || number > 26) {
    return "Número inválido";
  }
  const letra = String.fromCharCode(64 + number);
  return letra;
}
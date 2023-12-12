import { useContext, useEffect, useState } from 'react'
import { TeacherPanelContext } from '../../../../context/teacherPanelContext.jsx'
import { useTPlapseName } from '../evalPlan/evalPlanHooks/useTPlapseName.jsx'
import './printStudentList.css'


export default function PrintStudentList(){
     
  const {activeSubject, studentList, evalPlanList, activeEvalPlan, teacherData} = useContext(TeacherPanelContext)

  const [lapseid, setLapseid] = useState()
  const [stdList, setStdList] = useState([])
  const [percents, setPercents] = useState([])

  const lapseName = useTPlapseName()

  useEffect(()=>{
    if(!evalPlanList){
      return
    }
    const id =  evalPlanList[activeEvalPlan]?.idLapse 
    setLapseid(id)
  },[evalPlanList, activeEvalPlan])



  useEffect(()=>{
    if(!studentList || !evalPlanList || studentList === 'loading'){
      setStdList([])
      return
    }

    const newStdList = studentList.map(student =>{
        const {
          studentCi:ci,
          studentName,
          studentLastName,
          grades
        } = student
      
        const data =  evalPlanList[activeEvalPlan]
        const dates = []
        const desc = []
        const per = []

        for (const key in data) {
          if (key.startsWith('date')) {
            dates.push(data[key])
          }
          if (key.startsWith('desc')) {
            desc.push(data[key])
          }
          if (key.startsWith('per')) {
            per.push(data[key])
          }
        }

        const gradelist = {}
        //el if previene un bug cuando un alumno tiene grades = undefined
        if(grades){
          const evals = grades.filter(lapse => lapse.lapseid === lapseid)[0]?.evals

          if(evals){
            for(let i = 1 ; i <= per.length ; i++){
             gradelist['eval' + i] = evals['eval' + i] ? evals['eval' + i] : ""
            }
          }else{ // esto agrega celdas vacías si no tiene notas
            for(let i = 1 ; i <= per.length ; i++){
              gradelist['eval' + i] = ""
            }
          }
        }

        
        let acc = 0

        for(let i = 0 ; i < per.length ; i++){
          acc += (per[i]*gradelist[`eval${i+1}`])/100
        }
        
        setPercents(per)
       return {
          ci,
          studentLastName,
          studentName,
          ...gradelist,
          acc: acc > 0 ? acc : "" 
        }
      })

      setStdList(newStdList)

 // eslint-disable-next-line react-hooks/exhaustive-deps
  },[studentList, activeSubject, lapseid, evalPlanList])


  if(!stdList || stdList.length === 0){
    return <>
        <h1 className='Print-Students-seccion'>{activeSubject}</h1>
        <h1 className='Print-Students-teacherName'>{`Profesor: ${teacherData.name} ${teacherData.lastName} C.I. ${teacherData.ci}`}</h1> 
        <h1 className='Print-Students-lapseName'>{lapseName}</h1>
        <h1 className='Print-Students-seccion'>No se encontró un plan de evaluación para esta materia</h1>
    </>
  }


  return <>
    <h1 className='Print-Students-seccion'>{activeSubject}</h1>
    <h1 className='Print-Students-teacherName'>{`Profesor: ${teacherData.name} ${teacherData.lastName} C.I. ${teacherData.ci}`}</h1> 
    <h1 className='Print-Students-lapseName'>{lapseName}</h1>
    <div className='Print-Student-list Print-Student-list-headers'>
      <span>N°</span>
      <span>C.I.</span>
      <span>Apellidos</span>
      <span>Nombres</span>
      {
        percents.map((p, i)=> <span key={`pName${i}`}>{`${p}%`}</span>)
      }
      <span>def</span>
    </div>
    {
      stdList.map((student, i) => {
        return <div key={`std${i}`} className='Print-Student-list'>
          <span>{i+1}</span>
          <span>{student.ci}</span>
          <span>{student.studentLastName}</span>
          <span>{student.studentName}</span>
          {
            Object.keys(student).map((grade, j) => {
              if( grade.startsWith('eval')){
                return <span key={`grade${j}`} className='Print-Student-grade'>{student[grade]}</span>
              }
              return null
            })
          }
          <span>{student.acc}</span>
        </div>
      })
    }
  </>

}

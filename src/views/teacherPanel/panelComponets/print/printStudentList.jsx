import { useContext, useEffect, useState } from "react"
import { TeacherPanelContext } from "../../../../context/teacherPanelContext.jsx"

export default function PrintStudentList(){

  const {activeSubject, studentList, evalPlanList, activeEvalPlan, teacherData} = useContext(TeacherPanelContext)

  const [lapseid, setLapseid] = useState()
  const [stdList, setStdList] = useState([])


  
  useEffect(()=>{
    if(!evalPlanList){
      return
    }
    const id =  evalPlanList[activeEvalPlan]?.idLapse 
    setLapseid(id)
  },[evalPlanList, activeEvalPlan])



  useEffect(()=>{
    if(!studentList){
      return
    }

    const newStdList = studentList.map(student =>{

        const {
          studentCi:ci,
          studentName,
          studentLastName,
          grades
        } = student

        const evals = grades.filter(lapse => lapse.lapseid === lapseid)[0]?.evals

        const data =  evalPlanList[activeEvalPlan]
        const dates = [];
        const desc = [];
        const per = [];

        for (const key in data) {
          if (key.startsWith("date")) {
            dates.push(data[key]);
          }
          if (key.startsWith("desc")) {
            desc.push(data[key]);
          }
          if (key.startsWith("per")) {
            per.push(data[key]);
          }
        }

        const gradelist = {}
        let conunter = 1
        for (const key in evals) {
          if (key.startsWith("eval") && conunter < per.length + 1) {
            gradelist['eval' + conunter++] = evals[key]
          }
        }

    
       return {
          ci,
          studentLastName,
          studentName,
          ...gradelist
        }
      })

    
      setStdList(newStdList)

 // eslint-disable-next-line react-hooks/exhaustive-deps
  },[studentList, activeSubject, lapseid])

  //console.log(stdList)

  return <>

    <h1 id="Print-Students-seccion">{activeSubject}</h1>
    <h1 id="Print-Students-teacherName">{`Profesor: ${teacherData.name} ${teacherData.lastName} C.I. ${teacherData.ci}`}</h1>
      
    {
      stdList.map((student, i) => {
        return <div key={`std${i}`}>
          <span>{student.ci}</span>
          <span>{student.studentLastName}</span>
          <span>{student.studentName}</span>
          {
            Object.keys(student).map((grade, j) => {
              if( grade.startsWith("eval")){
                return <span key={`grade${j}`}>{student[grade]}</span>
              }
              return null
            })
          }
        </div>
      })
    }
  </>

}
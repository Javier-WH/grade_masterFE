import { useState, useEffect, useContext } from "react";
import { TeacherPanelContext } from '../../../../../context/teacherPanelContext.jsx'


export default function useTPEvalPlan(){

  const {evalPlanList, activeStudent, studentList, activeEvalPlan} = useContext(TeacherPanelContext)
  const [EvalPlan, setEvalPlan] = useState()

  useEffect(()=>{
  
    if(!evalPlanList){
      return 
    }

    const evalPlan = evalPlanList[activeEvalPlan]
  //////////////////////////////////////////////////////////////////////////////////
    const lapseid = evalPlan.idLapse
    const dates = [];
    const descs = [];
    const pers = [];
    

    for (const key in evalPlan) {
      if (key.startsWith("date")) {
        dates.push(evalPlan[key]);
      } else if (key.startsWith("desc")) {
        descs.push(evalPlan[key]);
      } else if (key.startsWith("per")) {
        pers.push(evalPlan[key]);
      }
    }


    const studentGrades = studentList[activeStudent].grades
   

    const filteredGrades = studentGrades ? studentGrades.filter(lapse => lapse.lapseid === lapseid) : []
    const evals = filteredGrades.length > 0 ? filteredGrades[0].evals : null;

    const items = dates.map((date, i)=>{
      return {
        date,
        desc: descs[i],
        pers: pers[i],
        eval: evals ? evals["eval"+(i+1)] : ""
      }
    })

  
    setEvalPlan(items)

  }, [activeStudent, evalPlanList, activeEvalPlan, studentList])

  return EvalPlan

}
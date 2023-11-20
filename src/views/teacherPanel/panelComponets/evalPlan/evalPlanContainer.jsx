import { useContext, useEffect, useState, } from 'react'
import { TeacherPanelContext } from '../../../../context/teacherPanelContext.jsx'
import Eval from './eval.jsx'
import './evalPlanContainer.css'

export default function EvalPlanContainer (){


  const {evalPlanList, activeStudent, studentList, activeEvalPlan, setActiveEvalPlan} = useContext(TeacherPanelContext)

  const [EvalPlan, setEvalPlan] = useState()
  



  useEffect(()=>{
  
    if(!evalPlanList){
      return
    }
    const evalPlan = evalPlanList[activeEvalPlan]
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
    const evals = studentGrades.filter(lapse => lapse.lapseid === lapseid)[0].evals


    const items = dates.map((date, i)=>{
      return {
        date,
        desc: descs[i],
        pers: pers[i],
        eval: evals["eval"+(i+1)]
      }
    })




    setEvalPlan(items)

  }, [activeStudent, evalPlanList, activeEvalPlan, studentList])



  if(!EvalPlan){
    return  <h3>no hay plan de evaluación</h3>
  }


  return <>
      <div id='TP-evalPlan-container'>
      {
        EvalPlan.map(evaluation => {
          return  <Eval key={evaluation.date} percent = {evaluation.pers} desc = {evaluation.desc} date = {evaluation.date}  grade = {evaluation.eval}/>
        })
      }
      </div> 
  </>

}


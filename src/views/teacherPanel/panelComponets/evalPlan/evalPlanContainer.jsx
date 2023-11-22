import { useContext } from 'react'
import { TeacherPanelContext } from '../../../../context/teacherPanelContext.jsx'
import useTPEvalPlan from './evalPlanHooks/useTPEvalPlan.jsx'
import { useTPlapseName } from './evalPlanHooks/useTPlapseName.jsx'
import useTPtotal from './evalPlanHooks/useTPtotal.jsx'
import { Button } from 'primereact/button';
import Eval from './eval.jsx'
import './evalPlanContainer.css'

export default function EvalPlanContainer (){


  const { evalPlanList, activeEvalPlan, setActiveEvalPlan} = useContext(TeacherPanelContext)

  const EvalPlan = useTPEvalPlan()
  const lapeName = useTPlapseName()
  const defGrade = useTPtotal({EvalPlan})


  const nextEvalPlan = () =>{
    let evalPlanCount = evalPlanList.length
    let currentEvalPlan = activeEvalPlan

    if(currentEvalPlan + 1 >= evalPlanCount){
      setActiveEvalPlan(0)
    }else{
      setActiveEvalPlan(currentEvalPlan + 1)
    }

  }

  const previusEvalPlan = () =>{
    let evalPlanCount = evalPlanList.length
    let currentEvalPlan = activeEvalPlan

    if(currentEvalPlan - 1 < 0){
      setActiveEvalPlan(evalPlanCount-1)
    }else{
      setActiveEvalPlan(currentEvalPlan - 1)
    }
  }
  
  let key = 1;

  if(!EvalPlan){
    return  <h3>no hay plan de evaluación</h3>
  }

  return <>
    
      <div id='TP-evalPlan-buttonsLapse-container'>
        <Button className='TP-evalPlan-buttonsLapse-item' icon="pi pi-chevron-left"  text aria-label="Filter" onClick={previusEvalPlan}/>
        <h3 className='TP-evalPlan-buttonsLapse-item TP-evalPlan-buttonsLapse-text'>{lapeName}</h3>
        <Button  className='TP-evalPlan-buttonsLapse-item' icon="pi pi-chevron-right"  text aria-label="Filter" onClick={nextEvalPlan}/>
        <div className='TP-evalPlan-buttonsLapse-total-container'>
          <span>def / acum</span>
          <h4 className='TP-evalPlan-buttonsLapse-total' >{defGrade}</h4>
        </div>
      </div>
      <div id='TP-evalPlan-container'>
      {

        EvalPlan.map(evaluation => {
          return  <Eval key={key++} percent = {evaluation.pers} desc = {evaluation.desc} date = {evaluation.date}  grade = {evaluation.eval ? evaluation.eval : ""} position = {key}/>
        })
      }
      </div> 
  </>

}


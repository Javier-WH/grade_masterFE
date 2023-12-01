import { useContext, useEffect, useState } from "react"
import { TeacherPanelContext } from "../../../../../context/teacherPanelContext.jsx"
import EvalPlanEditorSelector from "./evalPlanEditorSelector.jsx"
import EvalPlanPercent from "../evalPlanCreator/evalPlanPercent.jsx"
import EvalPlanDesCription from "../evalPlanCreator/evalPlanDescription.jsx"
import EvalPlanCalendar from "../evalPlanCreator/evalPlanCalendar.jsx"
import { Button } from 'primereact/button';
import './evalPlanEditor.css'

export default function EvalPlanEditor(){
  const {evalPlanList, setEvalPlanList} = useContext(TeacherPanelContext)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [idLapse, setIdLapse] = useState(null)
  const [idEvaluationPlan, setIdEvaluationPlan] = useState(null)
  const [idSubject, setIdSubject] = useState(null)
  const [evaluationList, setEvalEuationList] = useState([])
  
   const removeEval = index=>{
    const list = [...evaluationList]
    list.splice(index, 1)
    setEvalEuationList(list)

  }

  useEffect(()=>{
    if(!selectedPlan){
      return
    }
    const _currentPlan = evalPlanList.filter(plan => plan.idLapse === selectedPlan)[0]
    setIdLapse(_currentPlan.idLapse)
    setIdEvaluationPlan(_currentPlan.idEvaluationPlan)
    setIdSubject(_currentPlan.idSubject)



    const _dates = []
    const _desc = []
    const _per =[]

    //esto es para asegurarme de que las fechas mantengan el mismo orden
    let i = 1
    while (Object.prototype.hasOwnProperty.call(_currentPlan, "date" + i)) {
      _dates.push(_currentPlan["date" + i])
      i++
    }

    i = 1
    while (Object.prototype.hasOwnProperty.call(_currentPlan, "desc" + i)) {
      _desc.push(_currentPlan["desc" + i])
      i++
    }

    i = 1
    while (Object.prototype.hasOwnProperty.call(_currentPlan, "per" + i)) {
      _per.push(_currentPlan["per" + i])
      i++
    }

    const evaluations = _dates.map((date, i)=>{
      return {
        date,
        desc: _desc[i],
        per: _per[i]
      }
    })
  setEvalEuationList(evaluations)

   
  },[selectedPlan, evalPlanList])


 
  
  return <>
    <div id="EPE-evalplan-container">
      <EvalPlanEditorSelector setSP={setSelectedPlan}/>

      {
        selectedPlan ? 
          <div id="EPE-evaluation-container">
            <span>Fecha</span>
            <span>Descripción</span>
            <span>Porcentaje</span>
            <span></span>
          </div>
          :
          ""
      }   
   
      {
        evaluationList.map((evaluation, i)=>{
          return <div key={"eval" + i} id="EPE-evaluation-container">
            <EvalPlanCalendar index = {i} evaluationList={evaluationList} setEvalEuationList={setEvalEuationList}/>
            <EvalPlanDesCription index = {i} evaluationList={evaluationList} setEvalEuationList={setEvalEuationList}/>
            <EvalPlanPercent index = {i} evaluationList={evaluationList} setEvalEuationList={setEvalEuationList} />
               <div className="EPC-evaluation-deleteButton">   
                <Button icon="pi pi-trash" text severity="danger" aria-label="Cancel" onClick={()=> removeEval(i)} />
              </div>
          </div>

        })
      }
      <div id="EPE-updateButton-container">
        <Button label="Actualizar" severity="success" />
      </div>
    </div>
  </>
}
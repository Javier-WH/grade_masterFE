import { useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { TeacherPanelContext } from "../../../../../context/teacherPanelContext.jsx"
import EvalPlanEditorSelector from "./evalPlanEditorSelector.jsx"
import EvalPlanPercent from "../evalPlanCreator/evalPlanPercent.jsx"
import EvalPlanDesCription from "../evalPlanCreator/evalPlanDescription.jsx"
import EvalPlanCalendar from "../evalPlanCreator/evalPlanCalendar.jsx"
import { Button } from 'primereact/button';
import InsertEvalPlan from "../../../../../fetch/fetchInsertEvalPlan.js"
import './evalPlanEditor.css'
import { ToastContext } from '../../../../../context/toastContext.jsx';


export default function EvalPlanEditor({closeFunction}){
  const {evalPlanList, setEvalPlanList} = useContext(TeacherPanelContext)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [idLapse, setIdLapse] = useState(null)
  const [idEvaluationPlan, setIdEvaluationPlan] = useState(null)
  const [idSubject, setIdSubject] = useState(null)
  const [evaluationList, setEvalEuationList] = useState([])
  const {showToast} = useContext(ToastContext)
  
  const removeEval = index=>{
    const list = [...evaluationList]
    list.splice(index, 1)
    setEvalEuationList(list)

  }

    const addEval = ()=>{
    const evaluation =  {
      date: "",
      desc: "",
      per:""
    }
    const list = [...evaluationList]
    list.push(evaluation)
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




  const handleUpdate = ()=>{

    if(evaluationList.length === 0){
          showToast(
          {
            severity : 'warn',
            summary : 'Advertencia',
            detail : 'No hay evaluaciones que modificar'
          }
        );
      return
    }
    const dates = {}
    const percents = {}
    const desc = {}

    for (let [index, register] of evaluationList.entries()) {
      const date = register.date
      const percent = register.per
      const description = register.desc


      if(date === "" || date === null){
        showToast(
          {
            severity : 'warn',
            summary : 'Advertencia',
            detail : 'No puede haber fechas en blanco'
          }
        );
        return
      }
      if(description === "" || description === null){
        showToast(
          {
            severity : 'warn',
            summary : 'Advertencia',
            detail : 'No puede haber descripciones en blanco'
          }
        )
        return
      }

      if(percent === "" || percent === null){
        showToast(
          {
            severity : 'warn',
            summary : 'Advertencia',
            detail : 'No puede haber porcentajes en blanco'
          }
        )
        return
      }

      let dateString = date

      if(!(typeof date === "string")){ 
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        dateString = `${day}-${month}-${year}`;
      }

      const evaluation = `eval${index + 1}`
      dates[evaluation] = dateString
      percents[evaluation] = percent
      desc[evaluation] = description
    }

    const evalPlanData = {
      id: idEvaluationPlan,
      idSubject,
      idLapse,
      dates,
      percents,
      desc
    }

    //console.log(newLocalPlan)
    console.log(evalPlanData)
     InsertEvalPlan(evalPlanData).then(idEvaluationPlan =>{
        if(idEvaluationPlan){
            const newLocalPlan = {
              idEvaluationPlan,
              idLapse,
              idSubject
            }

          
            for(let i = 1 ; i <= Object.keys(dates).length ; i++ ){
                newLocalPlan[`date${i}`] = dates[`eval${i}`]
                newLocalPlan[`desc${i}`] = desc[`eval${i}`]
                newLocalPlan[`per${i}`] =  ""+percents[`eval${i}`]
            }

            const list = evalPlanList.map(lapse=>{
              if(lapse.idLapse === idLapse){
                lapse = newLocalPlan
              }
              return lapse
            })

            setEvalPlanList(list)

            showToast(
              {
                severity : 'success',
                summary : 'Exito',
                detail : 'Se ha actualizado el plan de evaluación'
              }
            )
            closeFunction()
          
        }else{
          showToast(
            {
              severity : 'error',
              summary : 'Error',
              detail : 'Ha ocurrido un error, no se agregó el plan de evaluación'
            }
          );

        }
     })
  
 }
 
  
  return <>
    <div id="EPE-evalplan-container">
      <EvalPlanEditorSelector setSP={setSelectedPlan}/>

      {
        selectedPlan ? 
          <div id="EPE-evaluation-container" className="EPC-evaluation-container EPE-row-gap EPC-evaluation-container-invisible">
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
          return <div key={"eval" + i}  className="EPC-evaluation-container EPE-row-gap">
            <EvalPlanCalendar index = {i} evaluationList={evaluationList} setEvalEuationList={setEvalEuationList} className="EPC-evaluation-calendar "/>
            <EvalPlanDesCription index = {i} evaluationList={evaluationList} setEvalEuationList={setEvalEuationList} className="EPC-evaluation-description"/>
            <EvalPlanPercent index = {i} evaluationList={evaluationList} setEvalEuationList={setEvalEuationList} className="EPC-evaluation-percent" />
               <div className="EPC-evaluation-deleteButton">   
                <Button icon="pi pi-trash" text severity="danger" aria-label="Cancel" onClick={()=> removeEval(i)} />
              </div>
          </div>
        })
      }
      <br />
      {
          selectedPlan ? 
           <Button label="Agregar evaluación" icon="pi pi-plus" severity="success" onClick={addEval}/>
          :
          ""
      }
     
      <div id="EPE-updateButton-container">
        <Button label="Actualizar" onClick={handleUpdate}/>
      </div>
    </div>
  </>
}

EvalPlanEditor.propTypes = {
  closeFunction: PropTypes.func.isRequired,
};
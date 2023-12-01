import PropTypes from "prop-types";
import { useContext, useState } from "react"
import { TeacherPanelContext } from "../../../../../context/teacherPanelContext.jsx"
import LapseSelector from "./lapseSelector.jsx"
import InsertEvalPlan from "../../../../../fetch/fetchInsertEvalPlan.js"
import EvalPlanCalendar from "./evalPlanCalendar.jsx"
import EvalPlanDesCription from "./evalPlanDescription.jsx"
import EvalPlanPercent from "./evalPlanPercent.jsx"
import { Button } from 'primereact/button';
import { ToastContext } from '../../../../../context/toastContext.jsx';
import './evalPlanCreator.css'

//falta crear la funcion de armar el objeto que se envia a la base de datos y enviarlo


export default function EvalPlanCreator({closeFunction}){

  let { evalPlanList, subjectId, setEvalPlanList } = useContext(TeacherPanelContext)
  const [idLapse, setIdLapse] = useState(null)
  const [evaluationList, setEvalEuationList] = useState([])
  const {showToast} = useContext(ToastContext)


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

  const removeEval = index=>{
    const list = [...evaluationList]
    list.splice(index, 1)
    setEvalEuationList(list)

  }
  
 //  console.log(evaluationList)

 const handleInsert = ()=>{
  if(!idLapse){
      showToast(
        {
          severity : 'warn',
          summary : 'Advertencia',
          detail : 'Debe seleccionar un lapso'
        }
      );
    return
  }

  if(evaluationList.length === 0){
         showToast(
        {
          severity : 'warn',
          summary : 'Advertencia',
          detail : 'No ha agregado ninguna evaluación'
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

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const dateString = `${day}-${month}-${year}`;
    
    const evaluation = `eval${index + 1}`
    dates[evaluation] = dateString
    percents[evaluation] = percent
    desc[evaluation] = description
  }
  const evalPlanData = {
    idSubject:  subjectId,
    idLapse,
    dates,
    percents,
    desc
  }
  

  
  //console.log(newLocalPlan)

   InsertEvalPlan(evalPlanData).then(idEvaluationPlan =>{
      if(idEvaluationPlan){
          const newLocalPlan = {
            idEvaluationPlan,
            idLapse,
            idSubject: subjectId
          }

      
          for(let i = 1 ; i <= Object.keys(dates).length ; i++ ){
              newLocalPlan[`date${i}`] = dates[`eval${i}`]
              newLocalPlan[`desc${i}`] = desc[`eval${i}`]
              newLocalPlan[`per${i}`] =  ""+percents[`eval${i}`]
          }

          if(!evalPlanList){
            setEvalPlanList([newLocalPlan])
          }else{
            const list = [...evalPlanList]
            list.push(newLocalPlan)
            setEvalPlanList(list)
            closeFunction();
          }
      
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
    <div id="EPC-container">
      <LapseSelector setIdLapse = {setIdLapse} />
      <div className="EPC-evaluation-container  EPC-evaluation-container-invisible">
        <span>Fecha</span>
        <span>Descripción</span>
        <span>Porcentaje</span>
      </div>
      {
        evaluationList.length === 0 ? ""
        :
        evaluationList.map((evaluation, i) =>{
          return  <div key={`evaluation${i}`} className="EPC-evaluation-container">
              <EvalPlanCalendar index = {i} evaluationList = {evaluationList} setEvalEuationList = {setEvalEuationList}  className="EPC-evaluation-calendar" />
              <EvalPlanDesCription index = {i} evaluationList = {evaluationList} setEvalEuationList = {setEvalEuationList}  className="EPC-evaluation-description"/>
              <EvalPlanPercent index = {i} evaluationList = {evaluationList} setEvalEuationList = {setEvalEuationList}  className="EPC-evaluation-percent"/>
              <div className="EPC-evaluation-deleteButton">   
                <Button icon="pi pi-trash" text severity="danger" aria-label="Cancel" onClick={()=> removeEval(i)} />
              </div>
          </div>
        })
      }
      <Button icon="pi pi-plus" rounded severity="success" aria-label="Search" label="Agregar Evaluación" onClick={addEval}/>
      <div id="EPC-button-container">
        <Button label="Cancelar" severity="secondary" rounded onClick={closeFunction} />
        <Button label="Crear" rounded onClick={handleInsert}/>
      </div>
    </div>
  </>
}

EvalPlanCreator.propTypes = {
  closeFunction: PropTypes.func.isRequired
};




/*
date1:"15-01-2022"
date2:"10-02-2022"
date3:"01-03-2022"
date4:"09-03-2022"
desc1:"examen"
desc2:"exposicion"
desc3:"trabajo"
desc4:"debate"
idEvaluationPlan:"9fbd2d15-9d7c-4403-9cd7-7f1462baf4e3"
idLapse:"9a1e2c3d-4b5a-6c7d-8e9f-0a1b2c3d4e5f"
idSubject:"b2d4c98a-1a0e-4d8b-9d2c-96de4f7f13e1"
per1:"25"
per2:"25"
per3:"25"
per4:"25"
*/
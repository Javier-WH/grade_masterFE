import { useContext, useEffect, useState } from "react"
import { TeacherPanelContext } from "../../../../../context/teacherPanelContext.jsx"
import LapseSelector from "./lapseSelector.jsx"
import InsertEvalPlan from "../../../../../fetch/fetchInsertEvalPlan.js"
import EvalPlanCalendar from "./evalPlanCalendar.jsx"
import EvalPlanDesCription from "./evalPlanDescription.jsx"
import EvalPlanPercent from "./evalPlanPercent.jsx"
import './evalPlanCreator.css'
import { Button } from 'primereact/button';
import PropTypes from "prop-types";

//falta crear la funcion de armar el objeto que se envia a la base de datos y enviarlo


export default function EvalPlanCreator({closeFunction}){

  let { evalPlanList, subjectId, setEvalPlanList } = useContext(TeacherPanelContext)
  const [idLapse, setIdLapse] = useState(null)
  const [evaluationList, setEvalEuationList] = useState([])
  

  //momentaneamente como una prueba
  useEffect(()=>{
    if(idLapse === null){
      return
    }

    if(evalPlanList === null ){
      const evalPlanData = {
        idSubject:  subjectId,
        idLapse,
        dates: {
          eval1: "08-07-2024",
          eval2: "15-08-2024",
          eval3: "30-08-2024",
          eval4: "15-09-2024"
        },
        percents: {
          eval1: 10,
          eval2: 25,
          eval3: 25,
          eval4: 35
        },
        desc: {
          eval1: "Examen",
          eval2: "Examen",
          eval3: "Examen",
          eval4: "Examen"
        }
      }

      InsertEvalPlan(evalPlanData)
        .then(idEvaluationPlan =>{
          if(idEvaluationPlan){
          const newPlan = {
            idEvaluationPlan,
            idLapse,
            idSubject: subjectId,
            date1:"15-01-2022",
            date2:"10-02-2022",
            date3:"01-03-2022",
            date4:"09-03-2022",
            desc1:"examenXD",
            desc2:"exposicionXd",
            desc3:"trabajoXD",
            desc4:"debateXD",
            per1:"25",
            per2:"25",
            per3:"25",
            per4:"25"
          }
          setEvalPlanList([newPlan])
          }else{
             alert("Ocurrió un error")
          }
        })


      //setEvalPlanList([newPlan])
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[idLapse])


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
  
 //  console.log(evaluationList)

  return <>
    <div id="EPC-container">
      <LapseSelector setIdLapse = {setIdLapse} />
      <div className="EPC-evaluation-container">
        <span>Fecha</span>
        <span>Descripción</span>
        <span>Porcentaje</span>
      </div>
      {
        evaluationList.length === 0 ? ""
        :
        evaluationList.map((evaluation, i) =>{
          return  <div key={`evaluation${i}`} className="EPC-evaluation-container">
              <EvalPlanCalendar index = {i} evaluationList = {evaluationList} setEvalEuationList = {setEvalEuationList}/>
              <EvalPlanDesCription index = {i} evaluationList = {evaluationList} setEvalEuationList = {setEvalEuationList}/>
              <EvalPlanPercent index = {i} evaluationList = {evaluationList} setEvalEuationList = {setEvalEuationList}/>
          </div>
        })
      }
      <Button icon="pi pi-plus" rounded severity="success" aria-label="Search" label="Agregar Evaluación" onClick={addEval}/>
      <div id="EPC-button-container">
        <Button label="Cancelar" severity="secondary" rounded onClick={closeFunction} />
        <Button label="Crear" rounded />
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
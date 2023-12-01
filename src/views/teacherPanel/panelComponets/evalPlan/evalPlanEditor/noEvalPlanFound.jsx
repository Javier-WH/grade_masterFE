import { Button } from 'primereact/button';
import { useState } from 'react';
import ShowEPC from '../evalPlanCreator/showEvalPlanCreator.jsx';

export default function NoEvalPlanFound(){

  const [showEPC, setShowEPC] = useState(false)

  const createPlanHandler = ()=>{
    setShowEPC(true)
  }

  return <>
    <h4>No se ha encontrado ningun plan de evaluación</h4> 
     <Button label="Crear nuevo plan de evaluación" onClick={createPlanHandler}/>
     <ShowEPC showEPC={showEPC} setShowEPC={setShowEPC}/>
  </>

}

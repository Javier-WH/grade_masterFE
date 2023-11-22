import { useState, useEffect } from "react";



export default function useTPtotal({EvalPlan}){

    const [defGrade, setDefGrade] = useState();

    useEffect(()=>{
    if(!EvalPlan){
      return
    }
    
    let total = 0;
    for (let plan of EvalPlan){
      const grade = plan.eval ? plan.eval : 1
      const percent = plan.pers
      const points = (grade * percent) / 100
      total += points
    }
    const def =  (Math.ceil(total * 100) / 100).toFixed(2);
    setDefGrade(def)
  },[EvalPlan, setDefGrade])

  return defGrade
}
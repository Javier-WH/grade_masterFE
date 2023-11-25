import { useState, useEffect, useContext } from "react";
import { TeacherPanelContext } from '../../../../../context/teacherPanelContext.jsx'

export function useTPlapseName(){

  const {evalPlanList, activeEvalPlan, lapseNames} = useContext(TeacherPanelContext)
  const [lapeName, setLapseName] = useState();

  useEffect(()=>{

    if(!lapseNames || !evalPlanList || activeEvalPlan === null){
      return
    }

    const idLapse = evalPlanList[activeEvalPlan].idLapse
    
    const lapseData = lapseNames.filter(lapse => lapse.id === idLapse)

    setLapseName(lapseData[0].name)


  },[lapseNames, evalPlanList, activeEvalPlan])

  return lapeName
}
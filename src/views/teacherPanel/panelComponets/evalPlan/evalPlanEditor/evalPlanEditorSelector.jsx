import PropTypes from "prop-types"
import { useContext, useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { TeacherPanelContext } from "../../../../../context/teacherPanelContext.jsx"

export default function EvalPlanEditorSelector({setSP}) {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const {evalPlanList, activeSubject, lapseNames} = useContext(TeacherPanelContext)
    const [planList, setPlanList] = useState([])
  
    useEffect(()=>{
      if(!selectedPlan){
        return
      }

      setSP(selectedPlan.code)

    },[selectedPlan, setSP])

    useEffect(()=>{
     const evalList = evalPlanList.map(obj1 => {
        const obj2 = lapseNames.find(obj2 => obj2.id === obj1.idLapse);
          if (obj2) {
            return { ...obj1, ...obj2 };
          } else {
            return obj1;
          }
      });

      const plans = evalList.map(plan =>{
        return { 
          name: plan.name,
          code: plan.id
        }
      })
      setPlanList(plans)
       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[evalPlanList])
    


    return (
        <div className="card flex justify-content-center">
            <h3 id="EPE-subject-title">{activeSubject}</h3>
            <Dropdown value={selectedPlan} onChange={(e) => setSelectedPlan(e.value)} options={planList} optionLabel="name" 
                placeholder="Selecciona un lapso" className="w-full md:w-14rem" />
        </div>
    )
}

EvalPlanEditorSelector.propTypes = {
  setSP: PropTypes.func.isRequired
};
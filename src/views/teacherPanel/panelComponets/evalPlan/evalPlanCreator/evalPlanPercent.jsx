
import { useState, useEffect} from "react";
import { InputNumber } from 'primereact/inputnumber';
import PropTypes from "prop-types";

export default function EvalPlanPercent({index, evaluationList, setEvalEuationList}) {
  const [value, setValue] = useState("");

  useEffect(()=>{
    if(!value){
      return
    }
    const list = [...evaluationList]
    list[index].per = value
    setEvalEuationList(list)

     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[value])

  return <InputNumber inputId="evalPlan-percent" value={value} onValueChange={(e) => setValue(e.value)} suffix="%" />
}

EvalPlanPercent.propTypes = {
  index: PropTypes.number.isRequired,
  evaluationList: PropTypes.array.isRequired,
  setEvalEuationList: PropTypes.func.isRequired
};

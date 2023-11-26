
import { InputNumber } from 'primereact/inputnumber';
import PropTypes from "prop-types";

export default function EvalPlanPercent({index, evaluationList, setEvalEuationList}) {
 
  const handleValue = val =>{
    const list = [...evaluationList]
    list[index].per = val
    setEvalEuationList(list)
  }

  return <InputNumber inputId="evalPlan-percent" value={evaluationList[index].per} onValueChange={(e) => handleValue(e.value)} suffix="%" inputStyle={{width:'100%'}}/>
}

EvalPlanPercent.propTypes = {
  index: PropTypes.number.isRequired,
  evaluationList: PropTypes.array.isRequired,
  setEvalEuationList: PropTypes.func.isRequired
};

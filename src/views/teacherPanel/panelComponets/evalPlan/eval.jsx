import PropTypes from "prop-types"
import { InputNumber } from 'primereact/inputnumber';
import { useEffect, useState} from 'react'


export default function Eval({percent, desc, grade, date}){

  const [value, setValue] = useState(grade);

  const handleValue = (e)=>{
    const _value = e.value
    console.log(_value)
    //setValue(_value)
  }

  useEffect(()=>{
    setValue(grade)
  },[grade])

  return<>
    <div className='TP-evalPlan-eval'>
      <span className="TP-evalPlan-eval-date">{date}</span>
      <span className="TP-evalPlan-eval-desc">{desc}</span>
      <span className="TP-evalPlan-eval-percent">{percent}</span>
       <InputNumber
        value={value} 
        onChange={(e)=> handleValue(e)}
        suffix=" pts" 
        className="TP-evalPlan-eval-grade"
        inputStyle={
          {
            width:"5em",
            textAlign: "center",
            fontSize: "1.9em",
            backgroundColor: "transparent",
            border: "none"
          }
        }
        
       />
    </div>
  </>

}

Eval.propTypes = {
  percent: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  grade: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};
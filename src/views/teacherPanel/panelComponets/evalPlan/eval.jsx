import PropTypes from "prop-types";
import { useEffect, useRef, useState } from 'react';

export default function Eval({percent, desc, grade, date}) {
  const [value, setValue] = useState(grade);
  const [isFocus, setIsFocus] = useState(false)
  const inputRef = useRef(null);

  const handleValue = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (!grade) {
      return;
    }
    setValue(grade);
  }, [grade]);

    const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <div className={`TP-evalPlan-eval ${isFocus ? "focusGrade" : ""}`}   onClick={handleClick}>
        <span className="TP-evalPlan-eval-date">{date}</span>
        <span className="TP-evalPlan-eval-desc">{desc}</span>
        <span className="TP-evalPlan-eval-percent">{`${percent}%`}</span>
        <input 
          type="number" 
          className={`TP-evalPlan-eval-grade ${ value == "" ? "exalted" : ""}`} 
          value={value} 
          onChange={handleValue} 
          onFocus={()=>setIsFocus(true)}
          onBlur={()=> setIsFocus(false)}
          ref={inputRef}
        />
      </div>
    </>
  );
}

Eval.propTypes = {
  percent: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  grade: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};






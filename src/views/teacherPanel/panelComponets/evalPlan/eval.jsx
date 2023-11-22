import PropTypes from "prop-types"
import { useContext, useEffect, useRef, useState } from 'react'
import { TeacherPanelContext } from "../../../../context/teacherPanelContext.jsx"

export default function Eval({percent, desc, grade, date, position}) {
  const [value, setValue] = useState(grade);
  const [isFocus, setIsFocus] = useState(false)
  const inputRef = useRef(null);
  const {studentList, setStudentList , activeStudent, evalPlanList, activeEvalPlan} = useContext(TeacherPanelContext)



  const handleValue = (e) => {

    if(!isValidGrade(e.target.value)){
      return
    }

    const input = e.target.value 


    const list = [...studentList]
    const lapseid = evalPlanList[activeEvalPlan].idLapse
    //const studentid = studentList[activeStudent].studentId
    //const evalPlanid = evalPlanList[activeEvalPlan].idEvaluationPlan
   // const evalPlan = evalPlanList[activeEvalPlan]


    const lapseExist = isLapseExist(list[activeStudent].grades, lapseid )

    if(lapseExist){
      for (let grade of list[activeStudent].grades ){
        if(grade.lapseid === lapseid){
          grade.evals[`eval${position}`] = input
        }
      }
    }else{
      list[activeStudent].grades.push(
        {
          lapseid,
          evals:{
            [`eval${position}`]: input
          }  
        }
      )
    }

    setStudentList(list)

  };

  useEffect(() => {
 
    setValue(grade)
  }, [grade]);



  
  const handleClick = () => {
    inputRef.current.focus()
  };

  return (
    <>
      <div className={`TP-evalPlan-eval ${isFocus ? "focusGrade" : ""}`}   onClick={handleClick}>
        <span className="TP-evalPlan-eval-date">{date}</span>
        <span className="TP-evalPlan-eval-desc">{desc}</span>
        <span className="TP-evalPlan-eval-percent">{`${percent}%`}</span>
        <input 
          type="text" 
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
  date: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
};



function isLapseExist(array, lapseId) {
  for (let i = 0; i < array.length; i++) {

    if (array[i].lapseid === lapseId) {
      return true; 
    }
  }
  return false; 
}



function isValidGrade(grade) {
  if (grade === "") {
    return true;
  }



  if (Number.isNaN(grade) || grade < 0 || grade > 20 || grade.includes(" ")) {
    return false;
  }

  const gradeNumber = parseFloat(grade)
  if (parseFloat(gradeNumber.toFixed(2)) != grade) {
    return false;
  }


  return true;
}


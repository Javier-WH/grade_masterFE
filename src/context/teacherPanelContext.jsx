import { createContext, useState} from "react"
import PropTypes from "prop-types"
import useAcademicYears from "../hooks/useAcademicYears.jsx"
import useLapseNames from "../hooks/useLapseNames.jsx"
import usePeriods from "../hooks/usePeriods.jsx"
import useSubjectNames from "../hooks/useSubjectNames.jsx"
import useSeccionNames from "../hooks/useSeccionNames.jsx"
import useSeccions from "../hooks/useSeccions.jsx"
import useEvalPlan from "../hooks/useEvalPlan.jsx"
import useTeacherSubjects from "../hooks/useTeacherSubjects.jsx"
import useSeccionBySubjectId from "../hooks/useSeccionBySubjectId.jsx"
import useTeacherData from "../hooks/useTeacherData.jsx"

export const TeacherPanelContext = createContext();

export function TeacherPanelContextProvider(props) {
  const academicYears = useAcademicYears()
  const lapseNames = useLapseNames()
  const periods = usePeriods()
  const seccionNames = useSeccionNames()
  const subjectNames = useSubjectNames()
  const seccions = useSeccions()
  const teacherSubjects = useTeacherSubjects()
  const [subjectId, setSubjectId] = useState()
  const [periodId, setPeriod] = useState("4a9f6e8c-2b51-4d9a-ae1c-3d7f0a6c8b9e")
  const [studentList, setStudentList] = useSeccionBySubjectId({id: subjectId, idPeriod:periodId})
  const [activeSubject, setActiveSubject] = useState()
  const [activeStudent, setActiveStudent] = useState(null)
  const [evalPlanList, setEvalPlanList] = useEvalPlan({idSubject: subjectId})
  const [activeEvalPlan, setActiveEvalPlan] = useState(0)
  const [gradesToSave, setGradesToSave] = useState([]);
  const [teacherData, setTeacherData] = useTeacherData();
  const [studentPhotos, setStudntPhotos] = useState([])
  


  function addGradesToSave(grade){
  const newGrade = [...gradesToSave]
  const exist = newGrade.filter(register => (register.idEvaluationPlan === grade.idEvaluationPlan && register.idStudent === grade.idStudent)).length > 0
  if(!exist){
    newGrade.push(grade)
  }else{
    for(let register of newGrade){
      if(register.idEvaluationPlan === grade.idEvaluationPlan && register.idStudent === grade.idStudent){
        for(let i = 1 ; i <= 10 ; i++){
          if(grade[`eval${i}`] !== undefined){
            register[`eval${i}`] = grade[`eval${i}`]
          }
        }
          
      }
    }
  }
    setGradesToSave(newGrade)
  }

 // console.log(activeSubject)

  const values = {
    academicYears,
    lapseNames,
    periods,
    subjectNames,
    seccionNames,
    seccions,
    teacherSubjects,
    periodId,
    setPeriod,
    subjectId,
    setSubjectId,
    studentList,
    setStudentList,
    activeSubject,
    setActiveSubject,
    activeStudent, 
    setActiveStudent,
    evalPlanList,
    setEvalPlanList,
    activeEvalPlan,
    setActiveEvalPlan,
    gradesToSave,
    addGradesToSave,
    setGradesToSave,
    teacherData, 
    setTeacherData,
    studentPhotos,
    setStudntPhotos
  }

  return (
    <TeacherPanelContext.Provider value={values}>
      {props.children}
    </TeacherPanelContext.Provider>
  );
}

TeacherPanelContextProvider.propTypes = {
  children: PropTypes.node
};


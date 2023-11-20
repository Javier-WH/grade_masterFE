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
  const studentList = useSeccionBySubjectId({id: subjectId, idPeriod:periodId})
  const [activeSubject, setActiveSubject] = useState()
  const [activeStudent, setActiveStudent] = useState(null)
  const evalPlanList = useEvalPlan({idSubject: subjectId})
  const [activeEvalPlan, setActiveEvalPlan] = useState(0)


 // console.log(evalPlanList)

  const values ={
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
    activeSubject,
    setActiveSubject,
    activeStudent, 
    setActiveStudent,
    evalPlanList,
    activeEvalPlan,
    setActiveEvalPlan
  
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
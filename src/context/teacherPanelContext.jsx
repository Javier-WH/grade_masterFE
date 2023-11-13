import { createContext, useState} from "react"
import PropTypes from "prop-types"
import useAcademicYears from "../hooks/useAcademicYears.jsx"
import useLapseNames from "../hooks/useLapseNames.jsx"
import usePeriods from "../hooks/usePeriods.jsx"
import useSubjectNames from "../hooks/useSubjectNames.jsx"
import useSeccionNames from "../hooks/useSeccionNames.jsx"
import useSeccions from "../hooks/useSeccions.jsx"
import useTeacherSubjects from "../hooks/useTeacherSubjects.jsx"


export const TeacherPanelContext = createContext();

export function TeacherPanelContextProvider(props) {

  const academicYears = useAcademicYears()
  const lapseNames = useLapseNames()
  const periods = usePeriods()
  const seccionNames = useSeccionNames()
  const subjectNames = useSubjectNames()
  const seccions = useSeccions()
  const teacherSubjects = useTeacherSubjects()
  const [studentList, setStudentList] = useState()


  const values ={
    academicYears,
    lapseNames,
    periods,
    subjectNames,
    seccionNames,
    seccions,
    teacherSubjects,
    studentList,
    setStudentList
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
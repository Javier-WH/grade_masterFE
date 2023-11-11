import { createContext} from "react"
import PropTypes from "prop-types"
import useAcademicYears from "../hooks/useAcademicYears.jsx"
import useLapseNames from "../hooks/useLapseNames.jsx"
import usePeriods from "../hooks/usePeriods.jsx"
import useSubjectNames from "../hooks/useSubjectNames.jsx"
import useSeccionNames from "../hooks/useSeccionNames.jsx"


export const TeacherPanelContext = createContext();

export function TeacherPanelContextProvider(props) {

  const academicYears = useAcademicYears()
  const lapseNames = useLapseNames()
  const periods = usePeriods()
  const subjectNames = useSubjectNames()
  const seccionNames = useSeccionNames()

  console.log(seccionNames)

  const values ={
    academicYears,
    lapseNames,
    periods,
    subjectNames,
    seccionNames
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
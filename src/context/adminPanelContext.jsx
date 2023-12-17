import { createContext} from "react"
import PropTypes from "prop-types"
import useAcademicYears from "../hooks/useAcademicYears.jsx"
import useLapseNames from "../hooks/useLapseNames.jsx"
import usePeriods from "../hooks/usePeriods.jsx"
import useSubjectNames from "../hooks/useSubjectNames.jsx"
import useSeccionNames from "../hooks/useSeccionNames.jsx"
import useSeccions from "../hooks/useSeccions.jsx"
import useConfig from "../hooks/useConfig.jsx"

export const AdminPanelContext = createContext();

export function AdminPanelContextProvider(props) {
  const academicYears = useAcademicYears()
  const lapseNames = useLapseNames()
  const periods = usePeriods()
  const seccionNames = useSeccionNames()
  const subjectNames = useSubjectNames()
  const seccions = useSeccions()
  const [config, setConfig] = useConfig()
  

  const values = {
    academicYears,
    lapseNames,
    periods,
    subjectNames,
    seccionNames,
    seccions,
    config, 
    setConfig
  }

  return (
    <AdminPanelContext.Provider value={values}>
      {props.children}
    </AdminPanelContext.Provider>
  );
}

AdminPanelContextProvider.propTypes = {
  children: PropTypes.node
};


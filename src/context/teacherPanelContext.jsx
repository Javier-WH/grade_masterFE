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

  


  function addGradesToSave(grade){

    let previusGrade = gradesToSave
    previusGrade.push(grade)
    const mergedGrades = Object.values(previusGrade.reduce((acc, obj) => {
      const key = obj.idStudent + '-' + obj.idEvaluationPlan;
        if (acc[key]) {
          acc[key] = { ...acc[key], ...obj };
        } else {
          acc[key] = { ...obj };
        }
        return acc;
    }, {}));

    setGradesToSave(mergedGrades)
  }


 // console.log(activeSubject)

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
    setTeacherData
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


  //objeto de prueba
/*
  const DTS = [
    {
      studentName: "Simion Bolivar",
      idStudent: "d5a98e80-7f10-4a7b-8a07-1e6f6f8d4a02",
      idEvaluationPlan: "2a7b1e2f-83bf-4d62-9eaa-8e1d5217e6a4",
      eval1: "11",
      eval2: "12",
      eval3: "13",
      eval4: "10"
    },
    {
      studentName: "Luisa Caseres de Arismendi",
      idStudent: "9fbd2d15-9d7c-4403-9cd7-7f1462baf4e3",
      idEvaluationPlan: "2a7b1e2f-83bf-4d62-9eaa-8e1d5217e6a4",
      eval1: "12",
      eval2: "14",
      eval3: "19",
      eval4: "14"
    },
       {
      studentName: "Amateratsu Lopes",
      idStudent: "9fbd2d15-9d7c-4403-9cd7-7f1462baf4e3",
      idEvaluationPlan: "9fbd2d15-9d7c-4403-9cd7-7f1462baf4e3",
      eval1: "12",
      eval2: "14",
      eval3: "19",
      eval4: "14"
    }

  ]*/
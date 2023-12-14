import {useContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { TeacherPanelContext } from "../../../../../context/teacherPanelContext.jsx"
import { ProgressBar } from 'primereact/progressbar';
import updateGrades from "../../../../../fetch/fetctUpdateGrades.js";
import { ToastContext } from '../../../../../context/toastContext.jsx';

export default function SaveGrades({closeFunction}){
  
  const [progress, setProgress] = useState(0)
  const [info, setInfo] = useState("")
  const { gradesToSave, setGradesToSave} = useContext(TeacherPanelContext)
  const [error, setError] = useState(null)
  const {showToast} = useContext(ToastContext)


  

  useEffect(()=>{

    if(error === 'error'){
      showToast({
        severity : 'error',
        summary : 'Error',
        detail : 'Ocurrió un error al intentar guardar las notas'
      });
    }else if(error ==='success'){
      showToast({
        severity : 'success',
        summary : 'Exito',
        detail : 'las notas fueron guardadas correctament'
      });
    } else if(gradesToSave.length == 0){
      showToast({
        severity : 'info',
        summary : 'Mensaje',
        detail : "No hay cambios que guardar"
      });
    } 

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[error])


  useEffect(() => {
    if (!gradesToSave) {
      closeFunction()
      return;
    }
    async function update() {
      const numberUpdates = gradesToSave.length;
      const progressChunk = 100 / numberUpdates
      let index = 0;
      while (index < numberUpdates) {
        const grade = gradesToSave[index];
        setInfo(`Guardando las notas de ${grade.studentName}`);
        const updated = await updateGrades({ grade });
  
        if (updated) {
          index++;
          setProgress(progress + progressChunk);
        } else {
          setError('error')
          setGradesToSave([])
          break;
        }
      }
      setProgress(100)
      setGradesToSave([])
      setError('success')
      closeFunction()
    }

    update();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gradesToSave, closeFunction, setGradesToSave ]);



  return <>
    <ProgressBar value={progress}></ProgressBar>
    <span>{info}</span>
  </>
}

SaveGrades.propTypes = {
  closeFunction: PropTypes.func.isRequired
};


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

    if(gradesToSave.length == 0){
      showToast({
        severity : 'info',
        summary : 'Mensaje',
        detail : "No hay cambios que guardar"
      });
    }else if(error === 'error'){
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
  
    }
    closeFunction()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[error])


  useEffect(() => {
    if (!gradesToSave) {
      closeFunction()
      return;
    }
    async function update() {
      const numberUpdates = gradesToSave.length;
      let index = 0;
      while (index < numberUpdates) {
        const grade = gradesToSave[index];
        setInfo(`Guardando las notas de ${grade.studentName}`);
        const updated = await updateGrades({ grade });
  
        if (updated) {
          index++;
          const currentProgress = ((index + 1) / numberUpdates) * 100;
          const clampedProgress = currentProgress > 100 ? 100 : currentProgress;
          setProgress(clampedProgress);
          setError('success')
          setGradesToSave([])
        } else {
          setError('error')
          setGradesToSave([])
          break;
        }
      }
    }

    update();
  }, [gradesToSave, closeFunction, setGradesToSave ]);



  return <>
    <ProgressBar value={progress}></ProgressBar>
    <span>{info}</span>
  </>
}

SaveGrades.propTypes = {
  closeFunction: PropTypes.func.isRequired
};


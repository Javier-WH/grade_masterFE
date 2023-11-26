import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import PropTypes from "prop-types";

export default function EvalPlanCalendar({index, evaluationList, setEvalEuationList}) {
   

    addLocale('es', {
        firstDayOfWeek: 1,
        showMonthAfterYear: true,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar'
    });


    const handleValue = val=>{
      const list = [...evaluationList]
      list[index].date = val
      setEvalEuationList(list)   
    }

    return <Calendar value={evaluationList[index].date } onChange={(e) => handleValue(e.value)} locale="es" inputStyle={{width:'100%'}}/>

}

EvalPlanCalendar.propTypes = {
  index: PropTypes.number.isRequired,
  evaluationList: PropTypes.array.isRequired,
  setEvalEuationList: PropTypes.func.isRequired
};



 // eslint-disable-next-line react-hooks/exhaustive-deps
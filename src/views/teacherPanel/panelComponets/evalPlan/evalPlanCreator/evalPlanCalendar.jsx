import { useEffect, useState } from "react";
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import PropTypes from "prop-types";

export default function EvalPlanCalendar({index, evaluationList, setEvalEuationList}) {
    const [date, setDate] = useState(null);

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

    useEffect(()=>{
      if(!date){
        return
      }

      const _date = new Date(date);
      const day = _date.getDate();
      const month = _date.getMonth() + 1; 
      const year = _date.getFullYear();
      const formatedDate = day + '-' + month + '-' + year;
      const list = [...evaluationList]
      list[index].date = formatedDate
      setEvalEuationList(list)

       // eslint-disable-next-line react-hooks/exhaustive-deps
    },[date])

    return (
        <div className="card flex justify-content-center">
            <Calendar value={date} onChange={(e) => setDate(e.value)} locale="es" />
        </div>
    )
}

EvalPlanCalendar.propTypes = {
  index: PropTypes.number.isRequired,
  evaluationList: PropTypes.array.isRequired,
  setEvalEuationList: PropTypes.func.isRequired
};



 // eslint-disable-next-line react-hooks/exhaustive-deps
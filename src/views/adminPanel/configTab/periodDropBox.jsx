import PropTypes from "prop-types";
import { Dropdown } from 'primereact/dropdown';
import Spiner from '../../../components/spiner/stpiner.jsx'

export default function PeriodDropBox({activePeriod, setActivePeriod, periods, loading}) {


    const values = periods.map(period =>{
      return {
        name: period.period,
        code: period.id
      }
    })

  
    return (
        <div className="card flex justify-content-center">
          {
            loading ?
              <Spiner/>
            :
              <Dropdown 
                value={activePeriod} 
                onChange={e=> setActivePeriod(e.value)} 
                options={values} 
                optionLabel="name" 
                placeholder="Selecciona un Periodo" 
                className="w-full md:w-14rem" 
                style={{width: '100%'}} 
              />
          }
        </div>
    )
}
        
PeriodDropBox.propTypes = {
  activePeriod: PropTypes.object,
  periods: PropTypes.array,
  setActivePeriod: PropTypes.func,
  loading: PropTypes.bool
};
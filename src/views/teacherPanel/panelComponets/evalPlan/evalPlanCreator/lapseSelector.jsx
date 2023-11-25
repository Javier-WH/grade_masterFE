import { Dropdown } from 'primereact/dropdown';
import { useContext, useEffect, useState } from 'react';
import { TeacherPanelContext } from "../../../../../context/teacherPanelContext.jsx"
import PropTypes from "prop-types";

export default function LapseSelector({setIdLapse}) {
    const { lapseNames } = useContext(TeacherPanelContext)
    const [selectedLapse, setSelectedLapse] = useState(null);
    const [lapseItems, setLapseItems] = useState([])
 
    useEffect(()=>{
      if(!lapseNames){
        return
      }

      const items = lapseNames.map(lapse =>{
        const name = lapse.name
        const code = lapse.id

        return{
          name,
          code
        }
      })

      setLapseItems(items)

    },[lapseNames])

    useEffect(()=>{
      if(!selectedLapse){
        return
      }
      setIdLapse(selectedLapse.code)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLapse])


    return (
        <div className="card flex justify-content-center">
            <Dropdown value={selectedLapse} onChange={(e) => setSelectedLapse(e.value)} options={lapseItems} optionLabel="name" 
                placeholder="Escoge un lapso" className="w-full md:w-14rem" />
        </div>
    )
}

LapseSelector.propTypes = {
  setIdLapse: PropTypes.func.isRequired
};
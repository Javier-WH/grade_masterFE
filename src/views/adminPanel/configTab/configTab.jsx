import { useContext, useEffect, useState } from "react"
import { AdminPanelContext } from "../../../context/adminPanelContext.jsx" 
import { Button } from 'primereact/button';
import Container from "../../../components/container/container.jsx"
import PeriodDropBox from "./periodDropBox.jsx"
import TextInput from "../../../components/inputs/textInput.jsx"
import './configTab.css'

export default function ConfigTab(){

  const [loading, setLoading] = useState(true)
  const { config, periods } = useContext(AdminPanelContext)
  const [activePeriod, setActivePeriod] = useState(null)
  const [institutionName, setInstitutionName] = useState('')


  useEffect(()=>{
    if(!config || !periods){
      return
    }
    const code = config?.find(register => register?.name === 'Active Period')?.value
    const name = periods?.find(register => register?.id === code)?.period
    setActivePeriod({code, name})

    const schoolName = config?.find(register => register?.name === 'School Name')?.value
    setInstitutionName(schoolName)
    setLoading(false)
     // eslint-disable-next-line
  }, [config, periods])


  return <div className="config-data-tab-maincontainer">
      <div className="config-data-tab-container">
        <Container title = "Período Activo">
          <PeriodDropBox 
            activePeriod = {activePeriod} 
            setActivePeriod = {setActivePeriod} 
            periods= {periods} 
            loading = {loading}
            />
        </Container>
        <Container title = "Datos de la institución">
          <TextInput 
            label = "Nombre de la institución" 
            id = 'config-institution-namer' 
            setText ={setInstitutionName} 
            text ={institutionName ? institutionName : 'Esperando...' } 
            klass = "config-input-institutionData" 
            loading = {loading}
            />
        </Container>
      </div>
      <div className="config-data-btn-container" >
        <Button label="Aceptar" icon="pi pi-check"  className="config-data-btn"/>
      </div>
  </div> 
}
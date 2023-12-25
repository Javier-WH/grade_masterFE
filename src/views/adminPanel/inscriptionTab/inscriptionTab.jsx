import { Button } from 'primereact/button';
import './inscriptionTab.css';

export default function InscriptionTaB (){

  return <div id='AP-IT-button-container'>
    <Button label="Registrar profesores" icon="pi pi-user"  className="AP-IT-button"/>
    <Button label="Registrar administradores" icon="pi pi-star"  className="AP-IT-button"/>
    <Button label="Registrar estudiantes" icon="pi pi-pencil"  className="AP-IT-button"/>
    <Button label="Registrar representantes" icon="pi pi-users"  className="AP-IT-button"/>
  </div>
}
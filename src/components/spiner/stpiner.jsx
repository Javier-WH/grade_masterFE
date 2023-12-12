import { ProgressSpinner } from 'primereact/progressspinner';
import './spiner.css'

export default function Spiner(){

  return <>
    <div className='spiner-container'>
      <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" animationDuration=".5s" />
    </div>
  </>
}
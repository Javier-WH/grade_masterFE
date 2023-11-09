import Paper from '../../assets/bathroomPaper.svg'
import './notFound.css'
export default function NotFoundPage() {

  return<>
    <img src={Paper} alt="" id='NFP-image'/>
    <h1 id='NFP-code'>404</h1>
    <h4 id='NFP-title'>La pagina solicitada no existe</h4>
  </>

}
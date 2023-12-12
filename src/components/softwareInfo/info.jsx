import PropTypes from "prop-types"
import Modal from '../../views/teacherPanel/panelComponets/menuComponents/modal.jsx'
import Logo from "../../views/logo/logo.jsx";
import './info.css'


export default function ShowSoftwareInfo({showSoftwareInfo, setShowSoftwareInfo}){

 
  return<>
      <Modal header="Información" visible ={showSoftwareInfo} setVisible={setShowSoftwareInfo}>
        <div id="info-info-container">
          <Logo/>
          <span>versión alpha 1.0</span>
          <span>Creado por Francisco Rodríguez</span>
          <span>Todos los derechos reservados</span>
        </div>
      </Modal>
  </>


}

ShowSoftwareInfo.propTypes = {
  showSoftwareInfo: PropTypes.bool.isRequired,
  setShowSoftwareInfo: PropTypes.func.isRequired,
};
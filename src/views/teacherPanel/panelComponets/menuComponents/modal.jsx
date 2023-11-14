import PropTypes from "prop-types"
import { Dialog } from 'primereact/dialog';


export default function Modal({header, visible, setVisible, children}) {
    return (
      <Dialog 
        header={header ? header : ""} 
        visible={visible} 
        maximizable 
        onHide={() => setVisible(false)}
        style={{ width: '50vw' }} 
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
      >
        {children}
      </Dialog>

    )
}
Modal.propTypes = {
  header: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  children: PropTypes.node
};
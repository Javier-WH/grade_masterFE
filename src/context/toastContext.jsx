import { createContext, useRef } from "react";
import PropTypes from "prop-types";
import { Toast } from 'primereact/toast';

export const ToastContext = createContext();

export function ToastContextProvider(props) {


  const toastBottomCenter = useRef(null);

  const showToast = ({severity = 'info', summary, detail, life = 3000})=>{
    toastBottomCenter.current.show(
      { 
        severity,
        summary, 
        detail, 
        life
      }
    );
  }

  return (
    <ToastContext.Provider value={{showToast}}>
      {props.children}
      <Toast ref={toastBottomCenter} position="bottom-center" />
    </ToastContext.Provider>
  );
}

ToastContextProvider.propTypes = {
  children: PropTypes.node
};
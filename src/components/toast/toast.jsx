
import { useContext, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { GlobalContext } from '../../context/globalContext.jsx';

export default function CustomToast() {

    const toastBottomCenter = useRef(null);

    const {toast} = useContext(GlobalContext)

   
    
    const showMessage = () => {

        toastBottomCenter.current.show({ 
          severity: toast.severity ?? 'info', 
          summary: toast.label, 
          detail: toast.detail, 
          life: 3000 
        });
    };

    useEffect(()=>{
      if(toast){
        showMessage()
      }
    })


    return <Toast ref={toastBottomCenter} position="bottom-center" />
}
        

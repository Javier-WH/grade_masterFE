import { createRoot } from 'react-dom/client';
import Routes from './routes/routes.jsx';
import { ToastContextProvider } from './context/toastContext.jsx';
import { PrimeReactProvider } from 'primereact/api';
import { ConfirmDialogProvider } from './context/confirmDialogoContext.jsx';
import 'primereact/resources/themes/arya-orange/theme.css';
import 'primeicons/primeicons.css';
import './index.css';

createRoot(document.getElementById('root')).render(

  <PrimeReactProvider>
    <ConfirmDialogProvider>
      <ToastContextProvider>
        <Routes />
      </ToastContextProvider>
    </ConfirmDialogProvider>
  </PrimeReactProvider>
 
);
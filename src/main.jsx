import React from 'react'
import ReactDOM from 'react-dom/client'
import routes from './routes/routes.jsx'
import { RouterProvider, } from "react-router-dom"
import { ToastContextProvider } from './context/toastContext.jsx'
import { PrimeReactProvider } from 'primereact/api'
import { ConfirmDialogProvider } from './context/confirmDialogoContext.jsx'
import 'primereact/resources/themes/arya-orange/theme.css'
import 'primeicons/primeicons.css';
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrimeReactProvider >
      <ConfirmDialogProvider>
        <ToastContextProvider>
          <RouterProvider router={routes} />
        </ToastContextProvider>
      </ConfirmDialogProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
)

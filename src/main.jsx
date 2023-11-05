import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import routes from './routes/routes.jsx'
import { RouterProvider, } from "react-router-dom"
import { GlobalContextProvider } from './context/globalContext.jsx'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/arya-orange/theme.css'
import 'primeicons/primeicons.css';
import CustomToast from './components/toast/toast.jsx'





ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <PrimeReactProvider >
      <GlobalContextProvider>
        <RouterProvider router={routes} />
        <CustomToast/>
      </GlobalContextProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
)

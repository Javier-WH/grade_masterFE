import './adminPanel.css'
import { TabView, TabPanel } from 'primereact/tabview';
import ConfigTab from './configTab/configTab.jsx';
import InscriptionTaB from './inscriptionTab/inscriptionTab.jsx';
import { AdminPanelContextProvider } from '../../context/adminPanelContext.jsx';
import Title from './title/title.jsx';

export default function AdminPanel() {
    return (
        <AdminPanelContextProvider>
          <Title/>
            <div className="card" id='AP-tab-Container'>
                <TabView scrollable>
                    <TabPanel header="Configuración" leftIcon="pi pi-cog">
                      <ConfigTab/>
                    </TabPanel>
                    <TabPanel header="Inscripciones" leftIcon="pi pi-user">
                      <InscriptionTaB/>
                    </TabPanel>
                    <TabPanel header="Reportes" leftIcon="pi pi-map">
                        <p className="m-0">
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti 
                            quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                            culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. 
                            Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                        </p>
                    </TabPanel>
                    <TabPanel header="Buscar" leftIcon="pi pi-search mr-2">
                        <p className="m-0">
                            buscar
                        </p>
                    </TabPanel>
                    <TabPanel header="Cuenta" leftIcon="pi pi-user">
                        <p className="m-0">
                            cuenta
                        </p>
                    </TabPanel>
                    <TabPanel header="Ayuda" leftIcon="pi pi-question" >
                        <p className="m-0">
                            ayuda
                        </p>
                    </TabPanel>
                </TabView>
            </div>
        </AdminPanelContextProvider>
    )
}
        
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { TeacherPanelContext } from '../../../context/teacherPanelContext.jsx';
import ShowStudentList from './menuComponents/list.jsx';
import ShowSave from './menuComponents/save/showSave.jsx';
import ShowEPC from './evalPlan/evalPlanCreator/showEvalPlanCreator.jsx';
import ShowEPE from './evalPlan/evalPlanEditor/showEvalPlanEditor.jsx';
import ShowTeacherData from './menuComponents/teacherData.jsx/showTeacherData.jsx';
import ShowTeacherPassword from './menuComponents/teacherPassword/showTeacherPassword.jsx';
import { useContext, useState, useRef } from 'react';
import { ConfirmDialogContext } from '../../../context/confirmDialogoContext.jsx';
import { ToastContext } from '../../../context/toastContext.jsx';
import { useReactToPrint } from 'react-to-print';
import PrintStudentList from './print/printStudentList.jsx';
import PrintEmpyStudentList from './print/printEmptyStudentList.jsx';
import PrintExcelFile from '../../../utils/printExcelFile/printExcelFile.js';
import ShowSoftwareInfo from '../../../components/softwareInfo/info.jsx';
import SearchStudent from './menuComponents/searchStudent/searchStudent.jsx';
import "./menu.css"

export default function TeacherPanelMenu() {
    const navigate = useNavigate()
    const { teacherSubjects, setSubjectId, setActiveSubject, setActiveStudent, gradesToSave, setGradesToSave, studentList, evalPlanList, activeEvalPlan, teacherData, activeSubject} = useContext(TeacherPanelContext)
    const [showList, setShowList] = useState(false)
    const [showSave, setShowSave] = useState(false)
    const [showEPC, setShowEPC] = useState(false)
    const [showEPE, setShowEPE] = useState(false) 
    const [showSoftwareInfo, setShowSoftwareInfo] = useState(false)
    const [showTeacherData, setShowTeacherData] = useState(false)
    const [showTeacherPass, setShowTeacherPass] = useState(false)
    const [showSearchStudent, setShowSearchStudent] = useState(false)
    const {showConfirmDialog} = useContext(ConfirmDialogContext)
    const {showToast} = useContext(ToastContext)

   
    const printRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => printRef.current,
    });

    const printEmpyRef = useRef();
    const handleEmpyPrint = useReactToPrint({
      content: () => printEmpyRef.current,
    });

    const handleCreateExcel = ()=>{
        if(!evalPlanList){
            showToast({
                severity : 'error',
                summary : 'Error',
                detail : 'No se ha encontrado un plan de evaluación'
            });
            return
        }
        PrintExcelFile({studentList, evalPlanList, activeEvalPlan, teacherData, activeSubject})
    }

    const askToSave = () => {
         showConfirmDialog({
            header: 'Hay notas sin guardar',
            icon: 'pi pi-exclamation-triangle',
            message: '¿Desea Guardar los cambios?',
              action: (confirmed) => {
                if (confirmed) {
                    setShowSave(true)
                }else{
                    showToast({
                        severity : 'warn',
                        summary : 'Advertencia',
                        detail : 'Las notas no fueron guardadas'
                    });
                    setGradesToSave([])
                }
            }
        });
    };

    const subjects = teacherSubjects === 'loading'? [] : teacherSubjects.map(item =>{
        const label = `${item.subjectName} ${item.academicYearName} ${item.seccionName}`
        return {
            label,
            icon: 'pi pi-fw pi-bookmark',
            command: ()=> {
                if(gradesToSave.length > 0){
                    askToSave()
                }
                setSubjectId(item.idSubject)
                setActiveSubject(label)
                setActiveStudent(null)
            }
        }
    })

 
    const items = [
        {
            label: 'Archivo',
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: 'Secciones',
                    icon: 'pi pi-fw pi-book',
                    items: subjects,
                    disabled: subjects.length > 0 ? false : true
                },
                {
                    label: 'Plan de evaluación',
                    icon: 'pi pi-fw pi-calendar',
                    disabled: subjects.length > 0 ? false : true,
                    items: [
                        {
                            label: 'Agregar Plan',
                            icon: 'pi pi-fw pi-calendar-plus',
                            command: ()=> setShowEPC(true)
                        },
                           {
                            label: 'Editar Plan',
                            icon: 'pi pi-fw pi-calendar-plus',
                            command: ()=>setShowEPE(true)
                        }
                    ]
                },
                {
                    label: 'Guardar',
                    icon: 'pi pi-fw pi-save',
                    command: ()=> setShowSave(true),
                    disabled: subjects.length > 0 ? false : true,
                },
                {
                  separator: true
                },
                {
                    label: 'Salir',
                    icon: 'pi pi-fw pi-power-off',
                    command: ()=>{
                       sessionStorage.clear();
                    navigate("/");
                    }
                }
            ]
        },
        {
            label: 'Reporte',
            icon: 'pi pi-fw pi-paperclip',
            disabled: subjects.length > 0 ? false : true,
            items: [
                {
                    label: 'Imprimir planilla',
                    icon: 'pi pi-fw pi-print',
                    command: handlePrint
                },
                {
                    label: 'Imprimir planilla vacía',
                    icon: 'pi pi-fw pi-print',
                    command: handleEmpyPrint
                },
                {
                    label: 'Generar Excel',
                    icon: 'pi pi-fw pi-file-excel',
                    command: handleCreateExcel
                },

            ]
        },
             {
            label: 'Estudiantes',
            icon: 'pi pi-fw pi-users',
            items: [
                {
                    label: 'Nomina',
                    icon: 'pi pi-fw pi-list',
                    disabled: subjects.length > 0 ? false : true,
                    command: ()=> setShowList(true)

                },
                {
                    label: 'Buscar estudiante',
                    icon: 'pi pi-fw pi-search',
                    command: ()=> setShowSearchStudent(true)

                }
            ]
        },
        {
            label: 'Usuario',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Editar datos de usuario',
                    icon: 'pi pi-fw pi-user-edit',
                    command: ()=> setShowTeacherData(true)

                },
                {
                    label: 'Cambiar contraseña',
                    icon: 'pi pi-fw pi-key',
                    command: ()=> setShowTeacherPass(true)

                }
            ]
        },
             {
            label: 'Ayuda',
            icon: 'pi pi-fw pi-question-circle',
            items: [
                {
                    label: 'Acerca de...',
                    icon: 'pi pi-fw pi-info',
                    command: ()=> setShowSoftwareInfo(true)

                },
                {
                    label: 'Preguntas frecuentes',
                    icon: 'pi pi-fw pi-question',
                }
            ]
        }
    ];


    return (
        <div className="card" id='TP-menu'>
            <Menubar model={items} />
            <ShowStudentList showList = {showList} setShowList={setShowList}/>
            <ShowSave showSave = {showSave} setShowSave = { setShowSave} />
            <ShowEPC showEPC= {showEPC} setShowEPC= {setShowEPC}/>
            <ShowEPE showEPE ={showEPE} setShowEPE ={setShowEPE}/>
            <ShowTeacherData showTeacherData = {showTeacherData} setShowTeacherData = {setShowTeacherData}/>
            <ShowTeacherPassword showTeacherPassword = {showTeacherPass} setShowTeacherPassword={setShowTeacherPass} />
            <ShowSoftwareInfo showSoftwareInfo ={showSoftwareInfo} setShowSoftwareInfo={setShowSoftwareInfo} />
            <SearchStudent showSearchStudent = {showSearchStudent} setShowSearchStudent ={setShowSearchStudent} />
            <div className='Menu-print-hide'>
                <div className='Menu-Print-nomina' ref={printRef}>
                    <PrintStudentList />
                </div>
            </div>
            <div className='Menu-print-hide'>
                <div className='Menu-Print-nomina' ref={printEmpyRef}>
                    <PrintEmpyStudentList/>
                </div>
            </div>
        </div>
    )
}
        
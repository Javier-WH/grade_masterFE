import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { TeacherPanelContext } from '../../../context/teacherPanelContext.jsx';
import ShowStudentList from './menuComponents/list.jsx';
import { useContext, useState } from 'react';


export default function TeacherPanelMenu() {
    const navigate = useNavigate()
    const { teacherSubjects, setSubjectId, setActiveSubject, setActiveStudent} = useContext(TeacherPanelContext)
    
    const [showList, setShowList] = useState(false)

    const subjects = teacherSubjects.map(item =>{
        const label = `${item.subjectName} ${item.academicYearName} ${item.seccionName}`
        return {
            label,
            icon: 'pi pi-fw pi-bookmark',
            command: ()=> {
                setSubjectId(item.idSubject)
                setActiveSubject(label)
                setActiveStudent(null)
            }
        }
    })



     //console.log(teacherSubjects)
    const items = [
        {
            label: 'Archivo',
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: 'Secciones',
                    icon: 'pi pi-fw pi-book',
                    items: subjects
                },
                {
                  label: 'Plan de evaluación',
                  icon: 'pi pi-fw pi-calendar',
                      items: [
                        {
                            label: 'Agregar Plan',
                            icon: 'pi pi-fw pi-calendar-plus'
                        },
                           {
                            label: 'Editar Plan',
                            icon: 'pi pi-fw pi-calendar-plus'
                        }
                    ]
                },
                {
                    label: 'Guardar',
                    icon: 'pi pi-fw pi-save'
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
            label: 'Editar',
            icon: 'pi pi-fw pi-paperclip',
            items: [
                {
                    label: 'Imprimir planilla',
                    icon: 'pi pi-fw pi-print'
                },
                {
                    label: 'Imprimir planilla vacía',
                    icon: 'pi pi-fw pi-print'
                },
                {
                    label: 'Generar PDF',
                    icon: 'pi pi-fw pi-file-pdf'
                },
                {
                    label: 'Generar Excel',
                    icon: 'pi pi-fw pi-file-excel'
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
                    command: ()=> setShowList(true)

                },
                {
                    label: 'Buscar estudiante',
                    icon: 'pi pi-fw pi-search',

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

                },
                {
                    label: 'Cambiar contraseña',
                    icon: 'pi pi-fw pi-key',

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
        </div>
    )
}
        
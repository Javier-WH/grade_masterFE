
import { Menu } from 'primereact/menu';
import { TeacherPanelContext } from '../../../context/teacherPanelContext.jsx';
import { useContext } from 'react';


export default function StarterMenu() {
   const { teacherSubjects, setSubjectId, setActiveSubject } = useContext(TeacherPanelContext)

    const items = teacherSubjects.map(item =>{
        const label = `${item.subjectName} ${item.academicYearName} ${item.seccionName}`
        return {
            label,
            icon: 'pi pi-fw pi-bookmark',
            command: ()=> {
                setSubjectId(item.idSubject)
                setActiveSubject(label)
            }
        }
    })

    return <>
      <div className="TP-container" id='TP-starterMenu'>
          <h2 id='TP-SM-title'>Escoge una materia para iniciar</h2>
          <Menu model={items} />
      </div>
    </>
    
}
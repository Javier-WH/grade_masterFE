import PropTypes from "prop-types";
import Container from '../../../../components/container/container.jsx'

export default function NotFoundStudent({title}){

      return<>
      <Container title = {title}>
        <div id = 'TP-noStudentFound'>
            <i className="pi pi-exclamation-triangle" style={{ fontSize: '4rem' }}></i>
            <br />
            <span> No se encontraron estudiates inscritos en esta sección </span>
        </div>
      </Container>
    </> 
}

NotFoundStudent.propTypes = {
  title: PropTypes.string
};
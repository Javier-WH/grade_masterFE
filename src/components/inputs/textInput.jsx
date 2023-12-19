import PropTypes from "prop-types";
import { InputText } from "primereact/inputtext";
import Spiner from '../../components/spiner/stpiner.jsx'

export default function TextInput({label, id, setText, text, klass, loading}) {

    return (
      <span className={`p-float-label ${klass}`} style={{width: '100%'}} >
          {
            loading ?
              <Spiner/>
            :
            <>
              <InputText id={id} value={text} onChange={(e) => setText(e.target.value)} style={{width: "100%"}}/>
              <label htmlFor={id}>{label}</label>
            </>
          }
      </span>

    )
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  klass: PropTypes.string,
  setText: PropTypes.func.isRequired,
  loading: PropTypes.bool
};
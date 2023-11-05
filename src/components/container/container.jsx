import PropTypes from "prop-types";
import './container.css'
export default function Container({title, children}){
  return (
    <section className="Container">
      {title !== undefined ? <h3 className="Container-title">{title}</h3> : null}
      {children}
    </section>
  ) 
}
Container.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
};
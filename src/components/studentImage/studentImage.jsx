
import PlaceHolder from '../../assets/studentPlaceHolder.svg'
import PropTypes from "prop-types";

export default function StudentImage({image}) {

  if(image === null || image === undefined){
    image = PlaceHolder
  }

    return <img 
      id='TP-studentImage'
      src={image}
    />
}

StudentImage.propTypes = {
  image: PropTypes.any
};


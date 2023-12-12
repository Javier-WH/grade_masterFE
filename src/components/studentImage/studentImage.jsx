import { TeacherPanelContext } from '../../context/teacherPanelContext.jsx';
import PlaceHolder from '../../assets/studentPlaceHolder.svg'
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from 'react';
import getStudentImage from '../../fetch/fetchStudentImage.js';
import Spiner from '../spiner/stpiner.jsx';
import './studentImage.css'

export default function StudentImage() {

  const {studentList, activeStudent, studentPhotos, setStudntPhotos} = useContext(TeacherPanelContext)
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsloading] = useState(false)

  useEffect(()=>{
    setImageUrl(null)
    const student = studentList[activeStudent]
    if(!student){
      return
    }

    const id = student.studentId
    const cachedPhoto = studentPhotos.filter(photo => photo.id === id)
    const exist = cachedPhoto.length > 0

    //esto es para que no descarga cada vez la foto, solo la descarga la primera vez
    if(exist){
      const photo = cachedPhoto[0].photo
      if(!photo){
        setImageUrl(PlaceHolder)
        return
      }
      const imageUrl = URL.createObjectURL(photo);
      setImageUrl(imageUrl);
    }else{
      setIsloading(true)
      getStudentImage({id})
      .then(photo => {
        const imageUrl = URL.createObjectURL(photo);
        const photos = [...studentPhotos]
        photos.push({
          id,
          photo
        }) 
        setStudntPhotos(photos)
        setImageUrl(imageUrl);
        setIsloading(false)
      })
      .catch(()=> {
        const photos = [...studentPhotos]
        photos.push({
          id,
          photo: null
        }) 
        setStudntPhotos(photos)
        
        setImageUrl(PlaceHolder)
        setIsloading(false)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[studentList, activeStudent])

    if(isLoading){
      return <div id='TP-studentImage'>
       <Spiner/>
      </div>
    }

    return <img 
      id='TP-studentImage'
      src={imageUrl === null ? PlaceHolder : imageUrl}
    />
}

StudentImage.propTypes = {
  image: PropTypes.any
};


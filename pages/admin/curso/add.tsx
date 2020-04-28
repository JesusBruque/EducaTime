import Layout from "../../../components/Layout";
import utilsStyles from "../../../styles/Utils.module.css";
import React, {useEffect, useRef, useState} from "react";
import blogsModule from "../../../styles/Blog.module.css";
import Button from "../../../components/Button";
import moment from "moment";
import {create} from '../../../utils/Course';

const ModificaFecha = (fecha) =>{
    console.log("Original: " + fecha);
    let newFecha = moment(fecha, 'YYYY-MM-DD').unix()*1000;
    // console.log("Nueva fecha: " + newFecha);
    // console.log("Verificando: " + moment(newFecha).format('YYYY-MM-DD'));
    return newFecha;
}
const AddCourse = (props) => {
    let diaApertura;
    let diaCierre;
    let finDeCurso;
    const CreateCourse = () => {
        if(credentials.title == "" || credentials.original_fee=="" || credentials.fees==""){
            FalloCrearCurso();
            return;
        }
        let tempA = ModificaFecha(credentials.dateStartInscription);
        let tempB = ModificaFecha(credentials.dateEndInscription);
        let tempC = ModificaFecha(credentials.dateEndCourse);
        if(!ValidateDates(tempA,tempB,tempC)){
            alert("Corrija las fechas");
            return;
        }
        console.log(credentials);
        create({...credentials, dateStartInscription: tempA, dateEndInscription: tempB, dateEndCourse: tempC}).then(()=>{
            alert("Se ha creado el curso con exito");
            props.router.push('/admin/formacion');
            }
            )
    }
    const ValidateDates = (a,b,c) => {
        console.log(moment(a));
        if(moment(a).isBefore(c) && moment(b).isBetween(a,c) && moment().isBefore(c))
        {
            return true;
        }
    }
    const FalloCrearCurso = () =>{
        alert("No se ha creado el curso. Llene los campos obligatorios.")
    }
    const [credentials, setCredentials] = useState({
                                            /**/         title: '',
                                                    thumbnail:'',
                                                    description: '',
                                                    target: '',
                                                    goals: "",
                                                    requirements: "",
                                            /**/        dateStartInscription: "",
                                            /**/        dateEndInscription: "",
                                            /**/        dateEndCourse: "",
                                           /**/         original_fee: "",
                                           /**/         fees: "",
                                           /**/         discount: '0',
                                           /**/         teacher: "",
                                           /**/         active: 'false'});
    

    const alloyRef = useRef(null);
    const [mainImage,setMainImage] = useState(null);
    useEffect(() => {
       props.utils.initLoader();
       props.utils.initScroll().then(() => {
           props.utils.removeLoader();
       });
       console.log('efecto tecto');
    },[]);
    return (
        <div className={utilsStyles.sectionContainer}>
            <h1 className={`${blogsModule.title} ${utilsStyles.sectionTitle}`}>Añadir Entrada</h1>
            <div>
                <label>
                    <h2> Selecciona una foto</h2>
                    <div className={blogsModule.addImageContainer}>
                        <input type='file' name={'upload-image'} style={{display:'none'}}/>
                        <img src={'/assets/icons/camera.svg'} alt='icono de camára'/>
                    </div>
                </label>
                <h2> Nombre del curso:</h2> 
                <input type="text" name="curso" value= {credentials.title} onChange={(e)=>setCredentials({...credentials, title : e.target.value})} required></input>
                <h2> Descripcion general:</h2>
                <input type="text" name="descripcion" value= {credentials.description} onChange={(e)=>setCredentials({...credentials, description : e.target.value})}></input>
                <h2> A quien va dirigido:</h2> 
                <input type="text" name="curso" value= {credentials.target} onChange={(e)=>setCredentials({...credentials, target : e.target.value})}></input>
                <h2> Lo que aprenderas:</h2> 
                <input type="text" name="curso" value= {credentials.goals} onChange={(e)=>setCredentials({...credentials, goals : e.target.value})}></input>
                <h2> Requisitos generales:</h2> 
                <input type="text" name="curso" value= {credentials.requirements} onChange={(e)=>setCredentials({...credentials, requirements : e.target.value})}></input>
                <h2> Fecha de apretura de inscripcion: <input type="date" name="apertura" value={credentials.dateStartInscription} onChange={(e)=> setCredentials({...credentials, dateStartInscription : e.target.value})}></input></h2> 
                <h2> Fecha de cierre de inscripcion: <input type="date" name="cierre" value = {credentials.dateEndInscription} onChange={(e)=> setCredentials({...credentials, dateEndInscription : e.target.value}) }></input></h2>
                <h2> Fecha de fin de curso: <input type="date" name="finCurso" value = {credentials.dateEndCourse} onChange={(e)=> setCredentials({...credentials, dateEndCourse : e.target.value}) }></input></h2>
                <h2> Coste del curso: <input type="number" min="1" step="0.01" name = "precio" value= {credentials.original_fee} onChange={(e)=>setCredentials({...credentials, original_fee : e.target.value})} required/></h2>
                <h2> Cuantos plazos de pago: <input type="number" min="1" max = "5" step="1" name = "plazos" value= {credentials.fees} onChange={(e)=> setCredentials({...credentials, fees : e.target.value})} required/></h2>
                <h2> Profesor asociado: <input type="text" name="profes" value= {credentials.teacher} onChange={(e)=>setCredentials({...credentials, teacher : e.target.value})}></input></h2>
                <Button color= {"blue"} text= {"Crear curso"} action= { ()=> CreateCourse()} type={"submit"}/>
            </div>
            {/*<DragNDrop styles={{height:'200px',width:'200px'}}  onlyImages={true}>*/}
            {/*    {mainImage && <img src={URL.createObjectURL(mainImage)}/>}*/}
            {/*</DragNDrop>*/}
            
        </div>
    )
}

export default AddCourse;
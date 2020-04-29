import Layout from "../../../components/Layout";
import utilsStyles from "../../../styles/Utils.module.css";
import React, {useEffect, useRef, useState} from "react";
import blogsModule from "../../../styles/Blog.module.css";
import Button from "../../../components/Button";
import moment from "moment";
import {create} from '../../../utils/Course';
import LayoutAdmin from "../../../components/LayoutAdmin";
import styles from '../../../styles/cursos/AddCurso.module.css';
import {faEdit,faCreditCard,faClock,faGlobe} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import TextEditor from "../../../components/TextEditor";
import DragNDrop from "../../../components/DragNDrop";
import DatePicker from "../../../components/DatePicker";

const ModificaFecha = (fecha) =>{
    return moment(fecha, 'YYYY-MM-DD').unix()*1000;
};

const AddCourse = (props) => {


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
    };
    const ValidateDates = (a,b,c) => {
        console.log(moment(a));
        if(moment(a).isBefore(c) && moment(b).isBetween(a,c) && moment().isBefore(c))
        {
            return true;
        }
    };
    const FalloCrearCurso = () =>{
        alert("No se ha creado el curso. Llene los campos obligatorios.")
    };
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


    const [inputEditing,setInputEditing] = useState(null);
    const [cursoInfo,setCursoInfo] = useState({title:'',target:'',requirements:'',fees:[],discount:0,original_fee:0,goals:'',lections:[],video:null,duration:0,webinar:''});
    const [showFeeDropDown,setShowFeeDropDown] = useState(false);
    const [feeEditing,setFeeEditing] = useState(null);

    const handleChangeEditing  = (inputName : string) => {
        setInputEditing(inputName);
    };

    useEffect(() => {
        console.log(cursoInfo);
    },[cursoInfo]);

    const handleInfoCursoChange = (content,property) => {
        setCursoInfo({...cursoInfo,[property]:content});
    };

    const addFeesRow = (numRows) => {
        props.utils.initLoader();
        let newFees = [];
        setShowFeeDropDown(false);
        for(let i =0;i<numRows;i++){
            newFees.push({fee:cursoInfo.original_fee/numRows,date:moment().format('DD/MM/YYYY')})
        }
        setCursoInfo({...cursoInfo,fees:newFees});
        props.utils.initScroll().then(() => {
            props.utils.removeLoader();
        });
    };
    const handleChangeFee = (i,property,value) => {
        setFeeEditing(null);
        let newFees = [...cursoInfo.fees];
        newFees[i][property] = value;
        setCursoInfo({...cursoInfo,fees:newFees});
    }

    return (
        <LayoutAdmin user={props.user} router={props.router} selected={'formacion'}>
            <div className={utilsStyles.sectionContainer}>
                <h1 className={`${utilsStyles.sectionTitle}`}>Añadir Curso</h1>
                <div className={styles.addContainer}>
                    <div>
                        <div className={styles.cursoInfoDetails}>
                            <DragNDrop/>
                            <div className={styles.cursoInfoDetailsGrid}>
                                <div className={styles.line}>
                                    <FontAwesomeIcon icon={faGlobe} className={utilsStyles.icon}/>
                                    <span>Español</span>
                                </div>
                                <div style={{display:'flex',justifyContent:'space-between',width:'100%',marginTop:'8px'}}>
                                    <div className={styles.line} style={{color:'var(--red-color)'}}>
                                        <input style={{fontSize:'1.1em',color:'var(--red-color)'}} type={'number'} value={cursoInfo.discount} className={styles.inputEditing} onChange={(e) => handleInfoCursoChange(e.target.value,'discount')}/>
                                        <span>% Dto.</span>
                                    </div>
                                    <div className={styles.line} style={{fontSize:'1.2em',fontWeight:'bold',color:'var(--black-color)'}}>
                                        <input style={{fontSize:'1.1em',fontWeight:'bold'}} type={'number'} value={cursoInfo.original_fee} className={styles.inputEditing} onChange={(e) => handleInfoCursoChange(e.target.value,'original_fee')}/>
                                        <span>€</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className={styles.line}>
                                        <FontAwesomeIcon icon={faCreditCard} className={utilsStyles.icon} style={{marginRight:'4px'}}/>
                                        <h4>Pago en {cursoInfo.fees.length>0 ? cursoInfo.fees.length : 1} Plazo{cursoInfo.fees.length>0 ? 's' : ''}</h4>
                                        <div style={{position:'relative',display:'flex',alignItems:'center'}}>
                                            <img src={'/assets/icons/add.svg'} className={utilsStyles.icon} alt={'icono de añadir'} onClick={() => setShowFeeDropDown(true)}/>
                                            {showFeeDropDown &&
                                                <React.Fragment>
                                                    <div className={utilsStyles.background} onClick={() => setShowFeeDropDown(false)}></div>
                                                    <div className={utilsStyles.dropDownAdd}>
                                                        <span onClick={() => addFeesRow(2)}>2</span>
                                                        <span onClick={() => addFeesRow(3)}>3</span>
                                                        <span onClick={() => addFeesRow(4)}>4</span>
                                                        <span onClick={() => addFeesRow(5)}>5</span>
                                                        <span onClick={() => addFeesRow(6)}>6</span>
                                                        <span onClick={() => addFeesRow(7)}>7</span>
                                                        <span onClick={() => addFeesRow(8)}>8</span>
                                                    </div>
                                                </React.Fragment>
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            cursoInfo.fees.map((fee,i) => {
                                                return (
                                                    <div className={styles.feeRow} key={i}>
                                                        <div>
                                                            <span style={{marginRight:'4px'}}>Cantidad:</span>
                                                            <input type={'number'} value={fee.fee} className={`${styles.inputEditing}`} onChange={(e) => handleChangeFee(i,'fee',e.target.value)}/>
                                                            <span>€</span>
                                                        </div>
                                                        <div style={{marginTop:'4px'}}>
                                                            <span style={{marginRight:'4px'}}>Fecha:</span>
                                                            <span onClick={() => setFeeEditing(i)} style={{color:'var(--black-color)'}}>{fee.date}</span>
                                                            {
                                                                feeEditing === i &&
                                                                    <div style={{position:'relative'}}>
                                                                        <div className={utilsStyles.background} onClick={()=>setFeeEditing(null)}></div>
                                                                        <div className={utilsStyles.calendarPickerInput}>
                                                                            <DatePicker rangeDate={false} selectDateEvent={(date) => handleChangeFee(i,'date',date)}/>
                                                                        </div>
                                                                    </div>
                                                            }
                                                        </div>
                                                </div>)
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.cursoInfoContent}>
                            <div className={`${styles.line}`}>
                                <h4 className={`${utilsStyles.sectionTitle} ${styles.subTitle}`}>Estructura del curso</h4>
                                <img src={'/assets/icons/add.svg'}  className={utilsStyles.icon} alt={'icono de añadir'}/>
                                {
                                    cursoInfo.webinar !== '' &&
                                    <div className={utilsStyles.dropDownAdd}>
                                        <span>Bloque</span>
                                        {cursoInfo.lections.length <= 0 && <span>Video</span>}
                                    </div>
                                }
                            </div>
                            <div>
                                {
                                    cursoInfo.lections.map((lection,i) => {
                                        return <span key={i}>{lection.title}</span>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.cursoInfoDescription}>
                        <div>
                            <input style={{fontSize:'1.1em',fontWeight:'bold',width:'350px',textTransform:'uppercase'}} type={'text'} value={cursoInfo.title} className={styles.inputEditing} onChange={(e) => handleInfoCursoChange(e.target.value,'title')} placeholder={'Título del curso'}/>
                        </div>
                        <div>
                            <div>
                                <div className={`${styles.line}`}>
                                    <h4 className={`${utilsStyles.sectionTitle} ${styles.subTitle}`}>A quién va dirigido</h4>
                                    {
                                        inputEditing === 'target' ?
                                            <Button action={() => setInputEditing(null)} text={'Guardar'} color={'blue'} />
                                            :
                                            <FontAwesomeIcon icon={faEdit}  onClick={() =>handleChangeEditing('target')} className={utilsStyles.icon}/>
                                    }
                                </div>
                                <div>
                                    {
                                        inputEditing === 'target' ?
                                            <TextEditor onChange={(content) =>handleInfoCursoChange(content,'target')} files={false} utils={props.utils} height={300} initialValue={cursoInfo.target} basic={true}/>
                                            :
                                            <div dangerouslySetInnerHTML={{__html: cursoInfo.target}} className={styles.cursoInfoDescriptionValue}></div>
                                    }
                                </div>
                            </div>
                            <div>
                                <div className={`${styles.line}`}>
                                    <h4 className={`${utilsStyles.sectionTitle} ${styles.subTitle}`}>Lo que aprenderás</h4>
                                    {
                                        inputEditing === 'goals' ?
                                            <Button action={() => setInputEditing(null)} text={'Guardar'} color={'blue'} />
                                            :
                                            <FontAwesomeIcon icon={faEdit}  onClick={() =>handleChangeEditing('goals')} className={utilsStyles.icon}/>
                                    }
                                </div>
                                {
                                    inputEditing === 'goals' ?
                                        <TextEditor onChange={(content) =>handleInfoCursoChange(content,'goals')} files={false} utils={props.utils} height={300} initialValue={cursoInfo.goals} basic={true}/>
                                        :
                                        <div dangerouslySetInnerHTML={{__html: cursoInfo.goals}} className={styles.cursoInfoDescriptionValue}></div>
                                }
                            </div>
                            <div>
                                <div className={`${styles.line}`}>
                                    <h4 className={`${utilsStyles.sectionTitle} ${styles.subTitle}`}>Requisitos</h4>
                                    {
                                        inputEditing === 'requirements' ?
                                            <Button action={() => setInputEditing(null)} text={'Guardar'} color={'blue'} />
                                            :
                                            <FontAwesomeIcon icon={faEdit}  onClick={() =>handleChangeEditing('requirements')} className={utilsStyles.icon}/>
                                    }
                                </div>
                                {
                                    inputEditing === 'requirements' ?
                                        <TextEditor onChange={(content) =>handleInfoCursoChange(content,'requirements')} files={false} utils={props.utils} height={300} initialValue={cursoInfo.requirements} basic={true}/>
                                        :
                                        <div dangerouslySetInnerHTML={{__html: cursoInfo.requirements}} className={styles.cursoInfoDescriptionValue}></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    )
}

export default AddCourse;

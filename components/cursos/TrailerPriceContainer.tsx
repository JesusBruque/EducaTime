import styles from "../../styles/cursos/AddCurso.module.css";
import MyDropzone from "../MyDropzone";
import utilsStyles from "../../styles/Utils.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCreditCard, faGlobe, faTimes} from "@fortawesome/free-solid-svg-icons";
import React, {Dispatch, useState, useEffect} from "react";
import DatePicker from "../DatePicker";
import Course,{validateFiles} from "../../utils/Course";
import moment from "moment";


type Props ={
    cursoInfo:Course,
    setCursoInfo:Dispatch<Course>,
    cursoFiles:{thumbnail:File,video:File},
    setCursoFiles:Dispatch<any>,
    handleInfoCursoChange:(content,property:string) => void,
    setVideoPlaying:Dispatch<any>
}

const TrailerPriceCourse = (props:Props) => {
    const [showFeeDropDown,setShowFeeDropDown] = useState(false);
    const [feeEditing,setFeeEditing] = useState(null);

    const addFeesRow = (numRows) => {
        let newFees = [];
        setShowFeeDropDown(false);
        for(let i =0;i<numRows;i++){
            newFees.push({fee:parseFloat((props.cursoInfo.original_fee/numRows).toFixed(2)),date:moment().unix()*1000})
        }
        props.setCursoInfo({...props.cursoInfo,fees:newFees});
    };

    const handleChangeFee = (i,property,value) => {
        setFeeEditing(null);
        let newFees = [...props.cursoInfo.fees];
        newFees[i][property] = property==='date' ? moment(value,'DD/MM/YYYY').unix()*1000 : parseFloat(value);
        console.log(newFees);
        props.setCursoInfo({...props.cursoInfo,fees:newFees});
    };


    const handleFilesCurso = (files:File[]) => {
        let newCursoFiles = {...props.cursoFiles};
        if(!validateFiles(files)) return false;
        files.forEach(file => {
            if(file.type.includes('image')) newCursoFiles.thumbnail = file;
            if(file.type.includes('video')) newCursoFiles.video = file;
        });
        props.setCursoInfo({...props.cursoInfo,thumbnail:newCursoFiles.thumbnail ? newCursoFiles.thumbnail.name: props.cursoInfo.thumbnail,video:newCursoFiles.video ? newCursoFiles.video.name : props.cursoInfo.video});
        props.setCursoFiles(newCursoFiles);
    };

    const showVideo = (file,e) => {
        e.stopPropagation();
        props.setVideoPlaying(file);
    };

    useEffect(() => {console.log(props.cursoFiles); console.log(props.cursoInfo.thumbnail)},[props.cursoFiles]);


    return (
        <div className={styles.cursoInfoDetails}>
            <MyDropzone
                text={'Arrastra o pincha para añadir el "trailer" del curso, y una imagen para su pre-visualización.'}
                image={'/assets/icons/picture.svg'}
                maxFiles={2}
                filesAccepted={['image/*','video/*']}
                onAcceptFile={(files) => handleFilesCurso(files)}
                // disabled={!!(props.cursoFiles.thumbnail && props.cursoFiles.video)}
            >
                {(props.cursoFiles.thumbnail || props.cursoInfo.thumbnail) &&  <img src={props.cursoFiles.thumbnail ? URL.createObjectURL(props.cursoFiles.thumbnail) :  props.cursoInfo.thumbnail} alt={'imagen de preview del curso'} style={{backgroundColor:'white'}}/> }
                {(props.cursoFiles.video || props.cursoInfo.video) && <img src={'/assets/icons/play-button.svg'} alt={'icono de play'} style={{opacity:'.9',width:'30px',height:'30px',backgroundColor:'white'}} onClick={(e) => props.cursoFiles.video ? showVideo(props.cursoFiles.video,e) : showVideo(props.cursoInfo.video,e)} className={utilsStyles.icon}/>}
            </MyDropzone>
            <div className={styles.cursoInfoDetailsGrid}>
                <div style={{display:'flex',justifyContent:'space-between',width:'100%',marginTop:'8px'}}>
                    {/*<div>*/}
                    {/*    {props.cursoFiles.thumbnail && <div className={styles.line} style={{marginRight:'14px'}}><span style={{marginRight:'4px'}}>Thumbnail:</span><b>{props.cursoFiles.thumbnail.name}</b><FontAwesomeIcon icon={faTimes} className={utilsStyles.icon} onClick={() => props.setCursoFiles({...props.cursoFiles,thumbnail:null})}/></div>}*/}
                    {/*    {props.cursoFiles.video && <div className={styles.line} style={{marginRight:'14px'}}><span style={{marginRight:'4px'}}>Video:</span><b>{props.cursoFiles.video.name}</b><FontAwesomeIcon icon={faTimes} className={utilsStyles.icon} onClick={() => props.setCursoFiles({...props.cursoFiles,video:null})}/></div>}*/}
                    {/*</div>*/}
                    <div className={styles.line}>
                        <FontAwesomeIcon icon={faGlobe} className={utilsStyles.icon}/>
                        <span>Español</span>
                    </div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',width:'100%',marginTop:'8px'}}>
                    <div className={styles.line} style={{color:'var(--red-color)'}}>
                        <input style={{fontSize:'1.1em',color:'var(--red-color)'}} type={'number'} value={props.cursoInfo.discount} className={utilsStyles.inputEditing} onChange={(e) => props.handleInfoCursoChange(e.target.value,'discount')}/>
                        <span>% Dto.</span>
                    </div>
                    <div className={styles.line} style={{fontSize:'1.2em',fontWeight:'bold',color:'var(--black-color)'}}>
                        <input style={{fontSize:'1.1em',fontWeight:'bold'}} type={'number'} value={props.cursoInfo.original_fee} className={utilsStyles.inputEditing} onChange={(e) => props.handleInfoCursoChange(e.target.value,'original_fee')}/>
                        <span>€</span>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div className={styles.line}>
                        <FontAwesomeIcon icon={faCreditCard} className={utilsStyles.icon} style={{marginRight:'4px'}}/>
                        <h4>Pago en {props.cursoInfo.fees.length>0 ? props.cursoInfo.fees.length : 1} Plazo{props.cursoInfo.fees.length>0 ? 's' : ''}</h4>
                        <div style={{position:'relative',display:'flex',alignItems:'center'}}>
                            <img src={'/assets/icons/add.svg'} className={utilsStyles.icon} alt={'icono de añadir'} onClick={() => setShowFeeDropDown(true)}/>
                            {props.cursoInfo.fees.length > 0 && <FontAwesomeIcon icon={faTimes} style={{marginLeft:'4px'}} onClick={() => props.setCursoInfo({...props.cursoInfo,fees:[]})} className={utilsStyles.icon}/>}
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
                            props.cursoInfo.fees.map((fee,i) => {
                                return (
                                    <div className={styles.feeRow} key={i}>
                                        <div>
                                            <span style={{marginRight:'4px'}}>Cantidad:</span>
                                            <input type={'number'} value={fee.fee} className={`${utilsStyles.inputEditing}`} onChange={(e) => handleChangeFee(i,'fee',e.target.value)}/>
                                            <span>€</span>
                                        </div>
                                        <div style={{marginTop:'4px'}}>
                                            <span style={{marginRight:'4px'}}>Fecha:</span>
                                            <span onClick={() => setFeeEditing(i)} style={{color:'var(--black-color)'}}>{moment(fee.date).format('DD/MM/YYYY')}</span>
                                            {
                                                feeEditing === i &&
                                                <div style={{position:'relative'}}>
                                                    <div className={utilsStyles.background} onClick={()=>setFeeEditing(null)}></div>
                                                    <div className={utilsStyles.calendarPickerInput}>
                                                        <DatePicker rangeDate={false} selectDateEvent={(date ) => handleChangeFee(i,'date',date)} minDate={i === 0 ? moment().format('DD/MM/YYYY') : moment(props.cursoInfo.fees[i-1].date).format('DD/MM/YYYY')} />
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
    )
};

export default TrailerPriceCourse;

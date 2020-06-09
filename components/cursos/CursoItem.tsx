import React, {Dispatch, FunctionComponent, useCallback, useState} from 'react';
import Course from "../../utils/Course";
import styles from '../../styles/cursos/CourseItem.module.css';
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe,faCreditCard,faEdit,faTrash} from "@fortawesome/free-solid-svg-icons";
import utilsStyles from "../../styles/Utils.module.css";
import Button from "../Button";
import Estrella from "../Estrella";
import {Router} from "next/router";
import moment from 'moment';
import {deleteCourse} from "../../utils/Course";
import WebUtils from "../../webUtils/WebUtils";
import ModalDelete from "../ModalDelete";

type Props = {
    curso:Course,
    router:Router,
    setCursoPlaying:Dispatch<any>,
    admin:boolean,
    reviews?:boolean,
    fees?:boolean,
    utils?:WebUtils
}

const CursoItem: FunctionComponent<Props> = (props) => {
    const {curso, router, setCursoPlaying} = props;

    const [sectionActive,setSectionActive] = useState('description');
    const [deleting,setDeleting] = useState(false);

    const renderInfoCourse = () => {
        let content = curso.description;
        switch (sectionActive) {
            case 'goals':
                content = curso.goals;
                break;
            case 'target':
                content = curso.target;
                break;
            case 'requirements':
                content = curso.requirements;
                break;
            default:
                content = curso.description;
                break;
        }
        return content;
    };
    const handleChangeInfo = (sect:string,e) => {
        e.stopPropagation();
        setSectionActive(sect);
    };
    const getCoursePrice = useCallback((curso:Course) => {
        return curso.original_fee - (curso.original_fee*(curso.discount/100));
    },[]);

    const renderStars = () => {
        let stars = [];
        for(let i=1;i<6;i++){
            let val = Math.floor(curso.score);
            let w = val >= i ? 100 : val+1 === i ? ((curso.score % 1)*100) : 0;
            stars.push(<Estrella width={w} key={i}/>)
        }
        return stars;
    }

    const handleBuyButton = () => {
        if(!props.reviews){
            let url = curso.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-');
            props.router.push({pathname:'/cursos/'+url, query:{id:curso._id}});
        }
        else{
            router.push('/cursos/payment/'+curso._id);
        }
    };

    const handleEditCourse = () => {
      router.push('/admin/formacion/'+curso._id);
    };

    const handleDeleteCourse = () => {
        setDeleting(true);
    };
    const confirmDelete = () => {
        if(props.utils){
            props.utils.initLoader();
            props.utils.startLoader();
            deleteCourse(curso._id).then(res => {
                console.log(res);
                props.utils.removeLoader();
                router.reload();
            }).catch(() => {
                window.alert('error al eliminar un curso!');
                props.utils.removeLoader();
            });
        }
    }

    return (
        <div className={styles.courseContainer}>
            {props.admin && <div className={styles.actionsIcons}><FontAwesomeIcon icon={faEdit} onClick={handleEditCourse}/> <FontAwesomeIcon icon={faTrash} onClick={handleDeleteCourse}/> </div>}
            <div className={styles.leftContainer}>
                <div className={styles.imageContainer}>
                    <img src={curso.thumbnail} alt={'imagen del curso'} onError={(e) => {e.currentTarget.src = '/assets/logo.svg'}} />
                    <img src={'/assets/icons/play-button.svg'} alt={'icono de play'} style={{opacity:'.9',width:'30px',height:'30px',backgroundColor:'white',cursor:'pointer'}} onClick={() => setCursoPlaying(curso)}/>
                </div>
                <div className={styles.gridContainer}>
                    <div className={styles.idioma}>
                        <FontAwesomeIcon icon={faGlobe} className={utilsStyles.icon}/>
                        <span>Español</span>
                    </div>
                    {curso.discount>0 && <div className={styles.descuento}><span>{curso.discount}% Dto. </span><span>{curso.original_fee.toFixed(2)} €</span></div> }
                    <span className={styles.precio}>{getCoursePrice(curso).toFixed(2)} €</span>
                    <div style={{gridArea:'valoracion'}} className={styles.valoraciones}>
                        {renderStars()}
                        <span style={{fontWeight:'bold',marginLeft:'4px',color:'var(--black-color)'}}>{curso.score}</span>
                    </div>
                    <Button color={'blue'} text={'comprar'} action={() => !props.admin ? handleBuyButton() : ''} styles={{gridArea:'comprar',width:'100%'}}/>
                </div>
                {props.fees && curso.fees.length>1 && <div className={styles.feesCourse}><FontAwesomeIcon icon={faCreditCard} className={utilsStyles.icon}/><span>Pago en {curso.fees.length} plazos</span></div>}
            </div>
            <div>
                <h3 style={{textTransform:'uppercase'}}>{curso.title}</h3>
                <div className={styles.links}>
                    <span className={`${styles.infoLink} ${sectionActive==='description' ? styles.active : ''}`} onClick={(e)=> handleChangeInfo('description',e)}>Descripción</span>
                    <span className={`${styles.infoLink} ${sectionActive==='target' ? styles.active : ''}`} onClick={(e)=> handleChangeInfo('target',e)}>A quién va dirigido</span>
                    <span className={`${styles.infoLink} ${sectionActive==='goals' ? styles.active : ''}`} onClick={(e)=> handleChangeInfo('goals',e)}>Lo que aprenderás</span>
                    <span className={`${styles.infoLink} ${sectionActive==='requirements' ? styles.active : ''}`} onClick={(e)=> handleChangeInfo('requirements',e)}>Información adicional y certificaciones</span>
                </div>
                <div>
                    <div dangerouslySetInnerHTML={{__html:renderInfoCourse()}}></div>
                </div>
            </div>
            {
                props.reviews &&
                    <div className={styles.reviewsContainer}>
                        {/*{curso.reviews.length > 0 && curso.reviews.map(review => {*/}
                        {/*    return <div key={review._id} style={{marginBottom:'15px'}}>*/}
                        {/*        <div className={styles.reviewHeader}>*/}
                        {/*            <div className={utilsStyles.userIcon}>*/}
                        {/*                <img src={'/assets/icons/user-icon.svg'} alt={'icono de usuario usuarios'}/>*/}
                        {/*            </div>*/}
                        {/*            <span>{review.user.name} {review.user.apellidos}</span>*/}
                        {/*            <span>el {moment(review.date).format('DD/MM/YYYY')}</span>*/}
                        {/*            <div>*/}
                        {/*                {renderStars()}*/}
                        {/*                <span style={{fontWeight:'bold',marginLeft:'4px',color:'var(--black-color)'}}>{curso.score}</span>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <div className={styles.reviewBody}>*/}
                        {/*            {review.review}*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*})}*/}
                        {curso.reviews.length === 0  && <h3 style={{textAlign:'center'}}>¡No hay ninguna valoración aún en este curso de formación!</h3>}
                    </div>
            }
            {deleting && <ModalDelete open={deleting} onDelete={confirmDelete} text={`¿Está seguro de que desea eliminar '${curso.title}'?`} setOpen={setDeleting}/>}
        </div>
    )
};

export default CursoItem;

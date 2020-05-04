import React, {Dispatch, FunctionComponent, useCallback, useState} from 'react';
import Course from "../../utils/Course";
import styles from '../../styles/cursos/CourseItem.module.css';
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";
import utilsStyles from "../../styles/Utils.module.css";
import Button from "../Button";
import Estrella from "../Estrella";
import {Router} from "next/router";

type Props = {
    curso:Course,
    router:Router,
    setCursoPlaying:Dispatch<any>
}

const CursoItem: FunctionComponent<Props> = (props) => {
    const {curso, router, setCursoPlaying} = props;

    const [sectionActive,setSectionActive] = useState('description');

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

    return (
        <div className={styles.courseContainer}>
            <div className={styles.leftContainer}>
                <div className={styles.imageContainer}>
                    <img src={curso.thumbnail} alt={'imagen del curso'} onError={(e) => {e.currentTarget.src = 'assets/logo.svg'}} />
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
                    <Button color={'blue'} text={'comprar'} action={() => router.push('/cursos/'+curso._id)} styles={{gridArea:'comprar',width:'100%'}}/>
                </div>
            </div>
            <div>
                <h3>{curso.title}</h3>
                <div className={styles.links}>
                    <span className={`${styles.infoLink} ${sectionActive==='description' ? styles.active : ''}`} onClick={(e)=> handleChangeInfo('description',e)}>Descripción</span>
                    <span className={`${styles.infoLink} ${sectionActive==='target' ? styles.active : ''}`} onClick={(e)=> handleChangeInfo('target',e)}>A quién va dirigido</span>
                    <span className={`${styles.infoLink} ${sectionActive==='goals' ? styles.active : ''}`} onClick={(e)=> handleChangeInfo('goals',e)}>Lo que aprenderás</span>
                    <span className={`${styles.infoLink} ${sectionActive==='requirements' ? styles.active : ''}`} onClick={(e)=> handleChangeInfo('requirements',e)}>Requisitos</span>
                </div>
                <div>
                    <div dangerouslySetInnerHTML={{__html:renderInfoCourse()}}></div>
                </div>
            </div>
        </div>
    )
};

export default CursoItem;

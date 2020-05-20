import Course from "../../utils/Course";
import Estrella from "../Estrella";
import React, { FunctionComponent } from "react";
import styles from '../../styles/cursos/CourseMobile.module.css';

type Props = {
    curso?: Course,
    imagen?:string,
    title?:string
}
const CursoMobile: FunctionComponent<Props> = (props) => {

    const { curso } = props;

    const renderStars = () => {
        let stars = [];
        for (let i = 1; i < 6; i++) {
            let val = Math.floor(curso.score);
            let w = val >= i ? 100 : val + 1 === i ? ((curso.score % 1) * 100) : 0;
            stars.push(<Estrella width={w} key={i} />)
        }
        return stars;
    }
    return (
        <div className={`${styles.itemContainer} ${props.curso ? '' : styles.proxCurso}`}>
            <div className={styles.itemImage} style={props.curso ? {} : {opacity:.4}}>
                <img src={props.curso ? curso.thumbnail : props.imagen} alt={'imagen preview del curso'} />
            </div>
            <div className={styles.itemInfo}>
                <div className={styles.priceInfo}>
                    <div className={styles.valoraciones}>
                        {props.curso && renderStars()}
                    </div>
                    {props.curso &&<span>{curso.original_fee.toFixed(2)} €</span>}
                </div>
                <div className={styles.cursoInfo}>
                    <h4>{props.curso ? curso.title : props.title}</h4>
                    {props.curso ? <span dangerouslySetInnerHTML={{ __html: curso.description }} /> : <div style={{fontSize:'1.5em',fontWeight:'bold',textAlign:'center',marginTop:'30px'}}>PRÓXIMAMENTE</div>}
                </div>
                <div className={styles.finalBtn} style={props.curso ? {} : {opacity:.4}}>
                    <span>Compra</span>
                </div>
            </div>
        </div>
    )
};

export default CursoMobile;

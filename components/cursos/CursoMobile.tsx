import Course from "../../utils/Course";
import Estrella from "../Estrella";
import React, {FunctionComponent} from "react";
import styles from '../../styles/cursos/CourseItem.module.css';

type Props = {
    curso: Course
}
const CursoMobile : FunctionComponent<Props> = (props) => {

    const {curso} = props;

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
        <div>
            <div>
                <img src={curso.thumbnail} alt={'imagen preview del curso'}/>
            </div>
            <div>
                <div className={styles.priceInfo}>
                    {renderStars()}
                    <span>{curso.original_fee.toFixed(2)} €</span>
                </div>
                <div className={styles.cursoInfo}>
                    <h4>{curso.title}</h4>
                    <span>{curso.description}</span>
                </div>
                <div className={styles.finalBtn}>
                    <span>Compra</span>
                </div>
            </div>
        </div>
    )
};

export default CursoMobile;

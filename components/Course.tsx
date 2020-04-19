import Link from 'next/link';
import courseStyles from "../styles/Course.module.css";

const Course = ({curso}) => {
    return (<Link href={`www.google.com`}>
        <div className={courseStyles.wrapper}>
            <div className={courseStyles.caja + " caja"}>
                <div className={courseStyles.VistaPreviaVideo}>
                    <img src= {curso.thumbnail} width="100%" height="100%"/>
                </div>
                <div className={courseStyles.Contenido}>
                <div className={courseStyles.Descripcion}>
                    <div className={courseStyles.NombreDeCurso}>
                         {curso.title} 
                    </div>
                    <div className={courseStyles.DescripcionDeCurso}>
                         {curso.description} 
                    </div>
                </div>
                <div className={courseStyles.Stats}>
                    
                    <div className={courseStyles.Rating}>
                        {curso.score}
                    </div>
                    <div className={courseStyles.PorCiento}>
                        {curso.perCent}
                    </div> 
                    <div className={courseStyles.Descuento}>
                        {curso.discount}%Dto40
                    </div>
                    <div className={courseStyles.Precio}>
                        {curso.fee}$
                    </div>
                </div>
            </div>
            </div>
        </div>
    </Link>)
};

export default Course;

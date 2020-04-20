import Link from 'next/link';
import courseStyles from "../styles/Course.module.css";

const Course = ({curso}) => {
    // (curso.Rating * 20).toString().concat("% 100%");
    let styles = {
        width: '100%',
        height: '100%',
        backgroundImage: "url('/assets/backRateBar.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: (curso.score * 20).toString()+"% 100%",
      }
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
                        <div className={courseStyles.Estrellas}>
                            <div style={styles} className= {courseStyles.barra}><img src={'/assets/rate.png'}></img></div>
                            
                        </div>
                         <div className={courseStyles.Score}>
                            {curso.score-((curso.score*10)%10)/10}{"."+(curso.score*10)%10}
                            
                         </div>
                    </div>
                    <div className={courseStyles.PorCiento}>
                        <div className={courseStyles.Numero}>{curso.perCent}%</div>
                        <div className={courseStyles.Like}></div>
                    </div> 
                    <div className={courseStyles.Descuento}>
                    {curso.discount}%Dto.{curso.original_fee-curso.current_fee}€
                    </div>
                    <div className={courseStyles.Precio}>
                        {curso.original_fee}€
                    </div>
                </div>
            </div>
            </div>
        </div>
    </Link>)
};

export default Course;

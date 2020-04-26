import courseStyles from "../styles/Course.module.css";
import PhotoItem from './PhotoItem'
import Cuerpo from './Cuerpo'
import GridItem from './GridItem'
import  Link from "next/link";

const CursoItem = ({curso}) => {
    let styles = {
        width: '100%',
        height: '100%',
        backgroundImage: "url('/assets/backRateBar.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: (curso.score * 20).toString()+"% 100%",
      }
    return (
        <Link href={'/cursos/'+curso._id}>
            <div className={`${courseStyles.wrapper} curso-item`} key={curso._id} data-scroll data-scroll-call={'loadBlog'} data-scroll-position={'bottom'}>
                <GridItem
                    horizontal= {true}
                    aspect={22}
                    proporcion ={"28%"}
                    cabecerita={<PhotoItem url = {curso.thumbail}/> }
                    cuerpito={
                        <Cuerpo titulo={curso.title}
                                descripcion = {curso.description}
                                final = {<div className={courseStyles.Stats}>
                                    <div className={courseStyles.Rating}>
                                        <div className={courseStyles.Estrellas}>
                                            <div style={styles} className= {courseStyles.barra}>
                                                <img src={'/assets/rate.png'}></img>
                                            </div>
                                        </div>
                                        <div className={courseStyles.Score}>
                                            {curso.score.toFixed(1)}
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
                                </div>}
                                anchoTitulo = {"20px"}/>}/>

                {/* // <div className={courseStyles.caja + " caja"}>
            //     <div className={courseStyles.VistaPreviaVideo}>
            //         <img src= {curso.thumbnail} width="100%" height="100%"/>
            //     </div>
            //     <div className={courseStyles.Contenido}>
            //     <div className={courseStyles.Descripcion}>
            //         <div className={courseStyles.NombreDeCurso}>
            //              {curso.title}
            //         </div>
            //         <div className={courseStyles.DescripcionDeCurso}>
            //             {curso.description}
            //         </div>
            //     </div>
            //     <div className={courseStyles.Stats}>

            //         <div className={courseStyles.Rating}>
            //             <div className={courseStyles.Estrellas}>
            //                 <div style={styles} className= {courseStyles.barra}><img src={'/assets/rate.png'}></img></div>

            //             </div>
            //              <div className={courseStyles.Score}>
            //                  {curso.score.toFixed(1)}
            //              </div>
            //         </div>
            //         <div className={courseStyles.PorCiento}>
            //             <div className={courseStyles.Numero}>{curso.perCent}%</div>
            //             <div className={courseStyles.Like}></div>
            //         </div>
            //         <div className={courseStyles.Descuento}>
            //         {curso.discount}%Dto.{curso.original_fee-curso.current_fee}€
            //         </div>
            //         <div className={courseStyles.Precio}>
            //             {curso.original_fee}€
            //         </div>
            //     </div>
            // </div>
            // </div> */}
            </div>
        </Link>
    )
};

export default CursoItem;

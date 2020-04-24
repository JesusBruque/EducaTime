import Cuerpo from '../components/Cuerpo'
import GridItem from '../components/GridItem'
import SidePanelCurso from '../components/SidePanelCurso'
import Layout from '../components/Layout';
import estilo from '../styles/CursoDetalle.module.css'
import utilsStyles from '../styles/Utils.module.css';
import Estrella from '../components/Estrella'
import Boton from '../components/Boton'

const PruebaCurso = () => {
    let text = {
        display: "inline-block",
        marginRight: "10px"
    }

    return (
        <Layout>
            <div className={estilo.panel}>
            <h1 className={utilsStyles.sectionTitle}>Curso de Formacion</h1>
            <GridItem
                horizontal={true}
                aspect={null}
                proporcion={"26%"}
                cabecerita= {<SidePanelCurso/>}
                cuerpito = {
                    <div>
                        <Cuerpo 
                            titulo = {
                                <div style = {text}>
                                    <div style={text}>Curso de formacion deportiva IV</div>
                                    <div style = {text}>
                                        <Boton ancho = {"20px"} 
                                               imgPath = {'/assets/edit.png'}
                                               backColor = {null}
                                               fontColor = {null}
                                               redondeado = {null} />
                                    </div>
                                </div>
                        }
                            descripcion = {"Descripcion 1"}
                            final = {null}
                            anchoTitulo = {"20px"}/>
                        <Cuerpo 
                            titulo = {
                                <div style = {text}>
                                    <div style={text}>A quien va dirigido</div>
                                    <div style = {text}>
                                        <Boton ancho = {"20px"} 
                                               imgPath = {'/assets/edit.png'}
                                               backColor = {null}
                                               fontColor = {null}
                                               redondeado = {null} />
                                    </div>
                                </div>}
                            descripcion = {"Descripcion 2"}
                            final = {null}
                            anchoTitulo = {"20px"}/>
                         <Cuerpo 
                             titulo = {
                                <div style = {text}>
                                    <div style={text}>Lo que aprenderas</div>
                                    <div style = {text}>
                                        <Boton ancho = {"20px"} 
                                               imgPath = {'/assets/edit.png'}
                                               backColor = {null}
                                               fontColor = {null}
                                               redondeado = {null} />
                                    </div>
                                </div>}
                             descripcion = {"Descripcion 3"}
                             final = {null}
                             anchoTitulo = {"20px"}/>
                             <Cuerpo 
                             titulo = {
                                <div style = {text}>
                                    <div style={text}>Requisitos</div>
                                    <div style = {text}>
                                        <Boton ancho = {"20px"} 
                                               imgPath = {'/assets/edit.png'}
                                               backColor = {null}
                                               fontColor = {null}
                                               redondeado = {null} />
                                    </div>
                                </div>}
                             descripcion = {"Descripcion 4"}
                             final = {null}
                             anchoTitulo = {"20px"}/>
                    </div>
                }
                />
                </div>
        </Layout>
    )
};

export default PruebaCurso;
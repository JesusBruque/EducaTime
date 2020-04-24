import GridItem from "./GridItem";
import Boton from './Boton'

const CapituloPanel = () =>{
    let y = {
        display: "grid",
        gridTemplateColumns: "10% 30% 30%",
        gridColumnGap: "5%",
        height: "100%",
        gridTemplateAreas: `'. A B'`
    }
    let A = {
        gridArea: 'A'
    }
    let B = {
        gridArea: 'B'
    }
    return (
            <GridItem
                horizontal = {true} 
                aspect= {"10"} 
                proporcion = {"65%"}
                cabecerita = {
                    <GridItem 
                        horizontal={true}
                        aspect={null}
                        proporcion={"25%"}
                        cabecerita={"00"}
                        cuerpito={
                            <GridItem 
                                horizontal={true} 
                                aspect={null}
                                proporcion={"75%"}
                                cabecerita={"Intro"}
                                cuerpito={
                                    <Boton ancho = {"100%"} 
                                        imgPath = {'/assets/video-player.png'}
                                        backColor = {null}
                                        fontColor = {null}
                                        redondeado = {null} />
                                    }/>
                        }/>
                }
                cuerpito = {
                    <div style={y} >
                        <div style = {A}>
                            <Boton ancho = {"100%"} 
                                    imgPath = {'/assets/delete.png'}
                                    backColor = {null}
                                    fontColor = {null}
                                    redondeado = {null} />
                        </div>
                        <div style = {B}>
                        <Boton ancho = {"100%"} 
                            imgPath = {'/assets/edit.png'}
                            backColor = {null}
                            fontColor = {null}
                            redondeado = {null} />
                            </div>
                    </div>
                }/>
    )
};

export default CapituloPanel;
import PhotoItem from './PhotoItem'
import GridItem from './GridItem'
import Stats from './Stats'
import CapituloPanel from './CapituloPanel';

const SidePanelCurso = () => {
    let backPanelEstilo = {
        display:"grid",
        width: "100%",
        background: "cyan"
    }
    let foto = {
        paddingTop: "64%",
        width: "100%",
        background: "black"
    }
    let info = {
        width: "100%"
    }
    return (
        <div style = {backPanelEstilo}>
            <GridItem 
                horizontal = {false} 
                aspect = {null} 
                proporcion = {"auto"}
                cabecerita = {
                    <div style = {foto}>
                        <PhotoItem url={"asd"}/>
                    </div>
                }
                cuerpito={
                    <div style = {info}>
                        <Stats/>
                        <CapituloPanel/>
                    </div>}/>
        </div>
    )
};

export default SidePanelCurso;
import GridItem from "../components/GridItem";
import Cuerpo from '../components/Cuerpo';

const Stats = () => {
    let backPanelEstilo = {
        marginTop: "20px",
        marginBottom: "20px",
        width: "100%",
        background: "green"
    }
    return (
        <div style = {backPanelEstilo}>
            <GridItem 
                horizontal = {true}
                aspect = {"30"}
                proporcion = {"50"}
                cabecerita = {
                    <Cuerpo 
                        titulo={"12h.De curso"}
                        descripcion={"40%Dcto.23.90$"}
                        final = {"4 estrellas"}
                        anchoTitulo={null}/>
                }
                cuerpito = {
                    <Cuerpo 
                        titulo={"Español"}
                        descripcion={"82.20$"}
                        final={"Comprar"}
                        anchoTitulo={null}/>
                }/>
        </div>
    )
};

export default Stats;
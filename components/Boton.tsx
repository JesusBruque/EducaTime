import botonEstilos from '../styles/Boton.module.css'

const Boton = ({ancho, imgPath, backColor, fontColor, redondeado}) => {
    let style = {
        width : ancho,
        paddingTop: "100%",
        background: backColor==null? "rgba(255, 255, 255, 0)": backColor,
        color: fontColor==null? "black":fontColor,
        borderRadius: redondeado==null? "0px": redondeado,
        display: "inline"
    }
    return(
        <div style = {style}>
            <div>
                <img width = "100%" height = "100%" src = {imgPath}></img>
            </div>
        </div>
    )
};

export default Boton;
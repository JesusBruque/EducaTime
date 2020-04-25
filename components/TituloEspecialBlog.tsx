import tituloEspecialStyle from '../styles/TituloEspecial.module.css'

const Titulo = ({blog})=>{
    return(
        <div className={tituloEspecialStyle.Contenedor}>
            <div className={tituloEspecialStyle.Left}>
            <div className={tituloEspecialStyle.Up}><p>{blog.title}</p></div>
                <div className={tituloEspecialStyle.Down}><p>La capacidad fisica dentro del futbol</p></div>
            </div>
            <div className={tituloEspecialStyle.Right}>
                <div className={tituloEspecialStyle.UpA}><p>{blog.author}</p></div>
                <div className={tituloEspecialStyle.DownA}><p>{blog.date}</p></div>
            </div>
        </div>
    )
};
export default Titulo;
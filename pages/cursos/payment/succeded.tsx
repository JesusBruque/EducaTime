import utilsStyles from "../../../styles/Utils.module.css";

const Succeded = () => {

    return (
        <div className={utilsStyles.sectionContainer} style={{display:'flex',flexDirection:'column',alignItems:'center',color:'var(--black-color)'}}>
            <img src={'/assets/accept.svg'} alt={'imagen de éxito'} style={{width:'150px'}}/>
            <h2 style={{textTransform:'uppercase'}}>¡Enhorabuena!</h2>
            <p>Compra realizada con éxito. Se ha enviado un email de confirmación. Revise la bandeja se spam</p>
            <p><b>¡Gracias por su compra!</b></p>
        </div>
    )
};

export default Succeded;

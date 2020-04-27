import utilsStyles from "../../../styles/Utils.module.css";

const Succeded = () => {
    return (
        <div className={utilsStyles.sectionContainer}>
            <img src={'/assets/accept.svg'} alt={'imagen de éxito'}/>
            <h2>¡Enhorabuena!</h2>
            <p>Compra realizada con éxito. Se ha enviado un email de confirmación. Revise la bandeja se spam</p>
            <p><b>¡Gracias por su compra!</b></p>
        </div>
    )
};

export default Succeded;

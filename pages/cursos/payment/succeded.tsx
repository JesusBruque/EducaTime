import utilsStyles from "../../../styles/Utils.module.css";
import Link from "next/link";
import Layout from "../../../components/Layout";
import {User} from "../../../utils/Authentication";
import {Dispatch} from "react";
import WebUtils from "../../../webUtils/WebUtils";
const Succeded = (props) => {

    return (
        <Layout utils={props.utils} user={props.user} setUser={props.setUser} router={props.router}>
            <div className={utilsStyles.sectionContainer} style={{display:'flex',flexDirection:'column',alignItems:'center',color:'var(--black-color)'}}>
                <img src={'/assets/accept.svg'} alt={'imagen de éxito'} style={{width:'150px'}}/>
                <h2 style={{textTransform:'uppercase'}}>¡Enhorabuena!</h2>
                <p>Compra realizada con éxito. Se ha enviado un email de confirmación. Revise la bandeja se spam</p>
                <p>Ya puede acceder a su curso desde su <Link href={'/login'}>perfil</Link></p>
                <p><b>¡Gracias por su compra!</b></p>
            </div>
        </Layout>

    )
};

export default Succeded;

import Layout from "./Layout";
import React, {FunctionComponent} from "react";

type Props ={
    absolute?:boolean
}
const Footer:FunctionComponent<Props> = (props) => {
    return (
        <footer className={props.absolute ? 'absolute' : ''} data-scroll>
            <div className={'legal-info'}>
                <span>términos y condiciciones</span>
                <span>aviso legal</span>
            </div>
            <div>
                <span>&copy;Todos los derechos reservados CASOR SL.</span>
            </div>
            <div>
                <a href={'#'} target={'_blank'}>
                    <img src={'/assets/icons/instagram-icon.svg'} alt={'icono de instagram'} />
                </a>
                <a href={'#'} target={'_blank'}>
                    <img src={'/assets/icons/twitter-icon.svg'} alt={'icono de twitter'} />
                </a>
                <a href={'#'} target={'_blank'}>
                    <img src={'/assets/icons/facebook-icon.svg'} alt={'icono de facebook'} />
                </a>
            </div>
        </footer>
    )
}

export default Footer;

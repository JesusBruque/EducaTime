import Layout from "./Layout";
import React, {FunctionComponent} from "react";
import Link from "next/link";
type Props ={
    absolute?:boolean
}
const Footer:FunctionComponent<Props> = (props) => {
    return (
        <footer className={props.absolute ? 'absolute' : ''} data-scroll>
            <div className={'legal-info'}>
                <Link href={'/politica'}>
                    <span>política de privacidad</span>
                </Link>
                <Link href={'/aviso-legal'}>
                    <span>aviso legal</span>
                </Link>
                <Link href={'#'}>
                    <span>política de devoluciones</span>
                </Link>
            </div>
            <div>
                <span>&copy;Todos los derechos reservados CASOR SL.</span>
            </div>
            <div>
                <a href={'https://instagram.com/formaciondeportivacasor?igshid=1g4dcayitsiq2'} target={'_blank'}>
                    <img src={'/assets/icons/instagram-icon.svg'} alt={'icono de instagram'} />
                </a>
                <a href={'#'} target={'_blank'}>
                    <img src={'/assets/icons/twitter-icon.svg'} alt={'icono de twitter'} />
                </a>
                <a href={'https://www.facebook.com/formaciondeportivacasor/'} target={'_blank'}>
                    <img src={'/assets/icons/facebook-icon.svg'} alt={'icono de facebook'} />
                </a>
            </div>
        </footer>
    )
}

export default Footer;

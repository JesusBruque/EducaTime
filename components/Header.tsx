import React, {useEffect, useState} from 'react';
import headerStyles from '../styles/Header.module.css';
import utilStyles from '../styles/Utils.module.css';
import Link from "next/link";
import gsap from 'gsap';
import {logout,check} from '../utils/Authentication';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCog, faPowerOff, faBookOpen} from "@fortawesome/free-solid-svg-icons";

type Props = {
    user:boolean,

}
const Header = (props) => {
    const [menuOpen,setMenuOpen] = useState(false);
    const [optionsOpen,setOptionsOpen] = useState(false);
    const goLogOut = () => {
        logout().then(() => {
            props.router.push('/login');
            props.setUser(null);
        });
    };

    return (
        <div id={'casor-header'} className={`${headerStyles.header} ${props.whiteboard ? headerStyles.headerWhiteBoard : ''}`}>
            <Link href={'/nosotros'}>
                <span className={`${headerStyles.headerLink} ${props.router.pathname.includes('nosotros') ?  headerStyles.linkActive : ''}`}>nosotros</span>
            </Link>
            <Link href={'/cursos'}>
                <span className={`${headerStyles.headerLink} ${props.router.pathname.includes('cursos') ?  headerStyles.linkActive : ''}`}>formación</span>
            </Link>
            <Link href={'/'}>
                <img className={headerStyles.logo} src={'/assets/logo_letras.png'} alt={'logo casor en la cabecera'}/>
            </Link>
            <Link href={'/blog'}>
                <span className={`${headerStyles.headerLink} ${props.router.pathname.includes('blog') ?  headerStyles.linkActive : ''}`}>blog</span>
            </Link>
            <Link href={'/contacto'}>
                <span className={`${headerStyles.headerLink} ${props.router.pathname.includes('contacto') ?  headerStyles.linkActive : ''}`}>contacto</span>
            </Link>
            <div className={`${utilStyles.userIcon} ${props.user ? utilStyles.userBlue : ''}`} onClick={() => props.user ? (props.user.roles.includes('admin') ?  props.router.push('/admin/formacion') : setOptionsOpen(true)) : props.router.push('/login')}>
                <img src={props.user ? '/assets/icons/user-icon.svg' : '/assets/icons/user.svg'} alt={'icono para el acceso de los usuarios'}/>
            </div>
            {props.user &&
                <React.Fragment>
                    {optionsOpen && <div className={`${utilStyles.background} ${headerStyles.menuBck}`} onClick={() => setOptionsOpen(false)}></div>}
                    <div className={`${utilStyles.dropDownAdd} ${headerStyles.optionsHeaderMenu} ${optionsOpen ? headerStyles.active : ''}`}>
                        <div className={headerStyles.userInfo}>
                            <span>{props.user.name}</span>
                            <span>{props.user.email}</span>
                        </div>
                        <div className={headerStyles.menuUser}>
                            <div className={headerStyles.optionItem} onClick={() => props.router.push('/whiteboard')}>
                                <FontAwesomeIcon icon={faBookOpen} />
                                <span>Cursos</span>
                            </div>
                            <div className={headerStyles.optionItem} onClick={() => props.router.push('/cuenta')}>
                                <FontAwesomeIcon icon={faUserCog} />
                                <span>Mi cuenta</span>
                            </div>
                            <div className={headerStyles.optionItem} onClick={goLogOut}>
                                <FontAwesomeIcon icon={faPowerOff} />
                                <span>Cerrar sesión</span>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
           }
        </div>
    )
};

export default Header;

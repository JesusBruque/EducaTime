import React, {useEffect, useState} from 'react';
import headerStyles from '../styles/Header.module.css';
import utilStyles from '../styles/Utils.module.css';
import Link from "next/link";
import gsap from 'gsap';
import {logout,check} from '../utils/Authentication';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCog, faPowerOff, faBookOpen,faTimes} from "@fortawesome/free-solid-svg-icons";

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


    const showMenu = () => {
        setMenuOpen(true);
        let tl = gsap.timeline();
        tl.to('#casor-mobile-menu',{duration:1,ease:'power3.out',x:'0%'});
        tl.to('#casor-mobile-menu span',{opacity:1,y:0,ease:'power.out',stagger:{each:.1}},"-=.5");
    };
    const hideMenu = () => {
        let tl = gsap.timeline({onComplete:() => setMenuOpen(false)});
        tl.to('#casor-mobile-menu span',{opacity:0,y:100,ease:'power.out',stagger:{each:.1}});
        tl.to('#casor-mobile-menu',{duration:1,ease:'power3.out',x:'100%'},"-=.1");
    };

    return (
        <React.Fragment>
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
            </div>
            <div id={'casor-mobile-header'} className={`${headerStyles.headerMobile} ${props.whiteboard ? headerStyles.headerWhiteBoard : ''}`}>
                {props.whiteboard  && <img src={'/assets/icons/menu-icon.png'} alt={'icono del menú'} style={{height:'55%'}}/>}
                <Link href={'/'}>
                    <img className={headerStyles.logo} src={'/assets/logo_letras.png'} alt={'logo casor en la cabecera'}/>
                </Link>
                <img src={'/assets/icons/menu-icon.png'} alt={'icono del menú'} style={{height:'55%'}} onClick={showMenu}/>
            </div>
            {menuOpen &&
            <div id={'casor-mobile-menu'} className={headerStyles.mobileMenu}>
                <Link href={'/'}>
                    <img onClick={hideMenu} className={headerStyles.imagenMenu} id={'logo menu'} src={'/assets/logo_texto.svg'}/>
                </Link>
                <FontAwesomeIcon icon={faTimes} onClick={hideMenu} className={headerStyles.close}/>
                <Link href={'/nosotros'} >
                    <span onClick={hideMenu} className={`${headerStyles.headerLink} ${props.router.pathname.includes('nosotros') ?  headerStyles.linkActive : ''}`}>nosotros</span>
                </Link>
                <Link href={'/cursos'}>
                    <span onClick={hideMenu} className={`${headerStyles.headerLink} ${props.router.pathname.includes('cursos') ?  headerStyles.linkActive : ''}`}>formación</span>
                </Link>
                <Link href={'/blog'}>
                    <span onClick={hideMenu} className={`${headerStyles.headerLink} ${props.router.pathname.includes('blog') ?  headerStyles.linkActive : ''}`}>blog</span>
                </Link>
                <Link href={'/contacto'}>
                    <span onClick={hideMenu} className={`${headerStyles.headerLink} ${props.router.pathname.includes('contacto') ?  headerStyles.linkActive : ''}`}>contacto</span>
                </Link>
                <div className={`${utilStyles.userIcon} ${utilStyles.userBlue}`} onClick={() => props.user ? (props.user.roles.includes('admin') ?  props.router.push('/admin/formacion') : setOptionsOpen(true)) : props.router.push('/login')}>
                    <img onClick={hideMenu} src={'/assets/icons/user-icon.svg'} alt={'icono para el acceso de los usuarios'}/>
                </div>
            </div>}
            {props.user &&
            <div className={headerStyles.optionsHeader}>
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
            </div>
            }
        </React.Fragment>
    )
};

export default Header;

import React, {Dispatch, useEffect, useState, FunctionComponent} from 'react';
import headerStyles from '../styles/Header.module.css';
import utilStyles from '../styles/Utils.module.css';
import Link from "next/link";
import gsap from 'gsap';
import {logout, check, User} from '../utils/Authentication';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserCog, faPowerOff, faBookOpen,faTimes, faEllipsisV} from "@fortawesome/free-solid-svg-icons";
import {Router} from "next/router";

type Props = {
    user:User,
    setUser:Dispatch<boolean>,
    router:Router,
    setLateralOpen?:Dispatch<boolean>,
    lateralOpen?:boolean,
    whiteboard?:boolean
}
const Header : FunctionComponent<Props> = (props) => {
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
    const hideMenu = (e) => {
        let location = e.currentTarget.dataset.href;
        let tl = gsap.timeline({onComplete:() => {
            setMenuOpen(false);
            if(location){
                props.router.push(location);
            }
            }});
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
            <header id={'casor-mobile-header'} className={`${headerStyles.headerMobile} ${props.whiteboard ? headerStyles.headerWhiteBoard : ''}`}>
                {props.whiteboard  && <FontAwesomeIcon icon={faEllipsisV} style={{height:'1.5em', color:'var(--main-color)'}} onClick={() => props.setLateralOpen(!props.lateralOpen)}/>}
                <Link href={'/'}>
                    <img className={headerStyles.logo} src={'/assets/logo_letras.png'} alt={'logo casor en la cabecera'}/>
                </Link>
                <div className={`${utilStyles.userIcon} ${utilStyles.userBlue}`} onClick={() => props.user ? (props.user.roles.includes('admin') ?  props.router.push('/admin/formacion') : setOptionsOpen(true)) : props.router.push('/login')}>
                    <img onClick={hideMenu} src={'/assets/icons/user-icon.svg'} alt={'icono para el acceso de los usuarios'}/>
                </div>
                <img src={'/assets/icons/menu-icon.png'} alt={'icono del menú'} style={{height:'55%'}} onClick={showMenu}/>
            </header>
            {menuOpen &&
            <div id={'casor-mobile-menu'} className={headerStyles.mobileMenu}>
                <img data-href={'/'} onClick={hideMenu} className={headerStyles.imagenMenu} id={'logo menu'} src={'/assets/logo_texto.svg'}/>
                <FontAwesomeIcon icon={faTimes} onClick={hideMenu} className={headerStyles.close}/>
                <span onClick={hideMenu} data-href={'/nosotros'} className={`${headerStyles.headerLink} ${props.router.pathname.includes('nosotros') ?  headerStyles.linkActive : ''}`}>nosotros</span>
                <span onClick={hideMenu} data-href={'/cursos'} className={`${headerStyles.headerLink} ${props.router.pathname.includes('cursos') ?  headerStyles.linkActive : ''}`}>formación</span>
                <span onClick={hideMenu} data-href={'/blog'} className={`${headerStyles.headerLink} ${props.router.pathname.includes('blog') ?  headerStyles.linkActive : ''}`}>blog</span>
                <span onClick={hideMenu} data-href={'/contacto'} className={`${headerStyles.headerLink} ${props.router.pathname.includes('contacto') ?  headerStyles.linkActive : ''}`}>contacto</span>
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

import React, {useEffect, useState} from 'react';
import headerStyles from '../styles/Header.module.css';
import utilStyles from '../styles/Utils.module.css';
import Link from "next/link";
import gsap from 'gsap';
import {logout,check} from '../utils/Authentication';

type Props = {
    user:boolean,

}
const Header = (props) => {
    const [menuOpen,setMenuOpen] = useState(false);
    const openMenu = () => {
        try{
            if(!menuOpen){
                gsap.to('#menu-csr',{duration:.5,scaleY:1,ease:'power3.ou'});
                gsap.to('#menu-csr .item',{duration:.5,opacity:1,ease:'power3.out',delay:.3});
                setMenuOpen(true);
            }else{
                gsap.to('#menu-csr .item',{duration:.5,opacity:0,ease:'power3.out'});
                gsap.to('#menu-csr',{duration:.5,scaleY:0,ease:'power3.out',delay:.2});
                setMenuOpen(false);
            }
        }catch(err){
            console.error(err);
        }
    };
    const goLogOut = () => {
        logout().then(() => {
            props.router.push('/login');
            props.setUser(null);
        });
    };

    return (
        <div id={'casor-header'} className={`${headerStyles.header} ${props.whiteboard ? headerStyles.headerWhiteBoard : ''}`}>
            {/*<Link href={'/nosotros'}>*/}
            {/*    <span className={`${headerStyles.headerLink} ${props.router.pathname.includes('nosotros') ?  headerStyles.linkActive : ''}`}>nosotros</span>*/}
            {/*</Link>*/}
            <Link href={'/cursos'}>
                <span className={`${headerStyles.headerLink} ${props.router.pathname.includes('cursos') ?  headerStyles.linkActive : ''}`}>formación</span>
            </Link>
            <Link href={'/'}>
                <img className={headerStyles.logo} src={'/assets/logo_letras.png'} alt={'logo casor en la cabecera'}/>
            </Link>
            <Link href={'/blog'}>
                <span className={`${headerStyles.headerLink} ${props.router.pathname.includes('blog') ?  headerStyles.linkActive : ''}`}>blog</span>
            </Link>
            {/*<Link href={'/contacto'}>*/}
            {/*    <span className={`${headerStyles.headerLink} ${props.router.pathname.includes('contacto') ?  headerStyles.linkActive : ''}`}>contacto</span>*/}
            {/*</Link>*/}
            <Link href={props.user ? (props.user.roles.includes('admin') ? '/admin/formacion' : '/whiteboard') : '/login'}>
                <div className={`${utilStyles.userIcon} ${props.user ? utilStyles.userBlue : ''}`}>
                    <img src={props.user ? '/assets/icons/user-icon.svg' : '/assets/icons/user.svg'} alt={'icono para el acceso de los usuarios'}/>
                </div>
            </Link>
            {props.user &&  <img src={'/assets/icons/stand-by.svg'} alt={'icono de logout'} onClick={goLogOut} className={headerStyles.exitIcon}/>}
        </div>
    )
};

export default Header;

import menuStyles from '../styles/Menu.module.css';
import React from 'react';
import Link from "next/link";
const Menu = () => {

    return (
        <div className={menuStyles.menuContainer} id={'menu-csr'}>
            <Link href={'/cursos'}>
                <div className={`${menuStyles.item} item`}>
                    <span className={menuStyles.title}>formación</span>
                    <img src={'assets/check-menu.svg'}/>
                </div>
            </Link>
            <div className={`${menuStyles.item} item`}>
                <span className={menuStyles.title}>nosotros</span>
                <img src={'assets/linea-menu.svg'}/>
            </div>
            <Link href={'/blogs'}>
                <div className={`${menuStyles.item} item`}>
                        <span className={menuStyles.title}>blog</span>
                        <img src={'assets/blog-menu.svg'} style={{height:'50px'}}/>
                </div>
            </Link>
            <div className={`${menuStyles.item} item`}>
                <span className={menuStyles.title}>contacto</span>
                <img src={'assets/contact-menu.svg'}/>
            </div>

            <img src={'assets/fondo-1.svg'} alt={'imagen de fondo'}/>
            <img src={'assets/fondo-2.svg'} alt={'imagen de fondo'}/>
        </div>
    )
};

export default Menu;

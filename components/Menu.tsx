import menuStyles from '../styles/Menu.module.css';
import React from 'react';

const Menu = () => {

    return (
        <div className={menuStyles.menuContainer} id={'menu-csr'}>
            <div className={`${menuStyles.item} item`}>
                <span className={menuStyles.title}>formación</span>
                <img src={'assets/check-menu.svg'}/>
            </div>
            <div className={`${menuStyles.item} item`}>
                <span className={menuStyles.title}>nosotros</span>
                <img src={'assets/linea-menu.svg'}/>
            </div>
            <div className={`${menuStyles.item} item`}>
                <span className={menuStyles.title}>blog</span>
                <img src={'assets/blog-menu.svg'} style={{height:'50px'}}/>
            </div>
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

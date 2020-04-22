import React, {useEffect} from 'react';
import adminStyles from '../../styles/Admin.module.css';
import Link from "next/link";
const AdminNavbar = ({selected}) => {

    useEffect(() => {
        /*---PANELES ESTILO BARRA LATERAL ---*/
        function showActiveTab(){
            let img = document.querySelector('#navBar-admin>img');
            if(img.getBoundingClientRect().height> 0){
                let panel1 = document.getElementById('panel-1');
                let panel2 = document.getElementById('panel-2');

                let itemSelected  = document.querySelector(`#navBar-admin>div[data-item="${selected}"]`);
                if(itemSelected instanceof HTMLElement){
                    panel1.style.height = `${ itemSelected.offsetTop}px`;
                    panel2.style.top = `${itemSelected.offsetTop + itemSelected.getBoundingClientRect().height}px`;
                    panel2.style.height = `${document.getElementById('navBar-admin').offsetHeight - itemSelected.offsetTop}px`;
                }
            }else{
                setTimeout(showActiveTab,10);
            }
        }

        showActiveTab();
    },[]);

    return (
        <nav className={adminStyles.navBar} id={'navBar-admin'}>
            <div id={'panel-1'} className={adminStyles.navBarPanel}></div>
            <div id={'panel-2'} className={adminStyles.navBarPanel}></div>
            <img src={'/assets/logo_texto.svg'}/>
            <Link href={'/admin/formacion'}>
                <div className={`${adminStyles.navItem} ${selected === 'formacion' ? adminStyles.active : ''}`} data-item={'formacion'}>
                    <img src={'/assets/check-menu.svg'} alt={'icono de formación'}/>
                    <span>formación</span>
                </div>
            </Link>
            <Link href={'/admin/blog'}>
                <div className={`${adminStyles.navItem} ${selected === 'blog' ?  adminStyles.active : ''}`} data-item={'blog'}>
                    <img src={'/assets/blog-menu.svg'} alt={'icono de blog'}/>
                    <span>blog</span>
                </div>
            </Link>
            <Link href={'/admin/compras'}>
                <div className={`${adminStyles.navItem} ${selected === 'compras' ?  adminStyles.active : ''}`} data-item={'compras'}>
                    <img src={'/assets/check-menu.svg'} alt={'icono de compras'}/>
                    <span>compras</span>
                </div>
            </Link>
        </nav>
    )
};

export default AdminNavbar;

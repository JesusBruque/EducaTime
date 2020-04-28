import AdminNavbar from "./admin/AdminNavbar";
import React from "react";
import layoutStyles from '../styles/Layout.module.css';

const LayoutAdmin = () => {

    // const checkAdmin = async () => {
    //     if(router.pathname.split('/')[1] === 'admin' && (!user.user || user.user.rol !== 'admin')){
    //         await router.push('/login');
    //         console.log('no es administrador y está intentado acceder a una vista de admin');
    //     }
    // };

    return (
        <React.Fragment>
            <main className={layoutStyles.adminContainer}>

            </main>
            <AdminNavbar selected={'formacion'}/>
        </React.Fragment>
    )

};
export default LayoutAdmin;

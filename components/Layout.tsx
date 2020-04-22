import React from 'react';
import Header from "./Header";
import Menu from "./Menu";
import AdminNavbar from "./admin/AdminNavbar";
import adminStyles from '../styles/Admin.module.css';

const Layout = props => {

    if(!props.admin){
        return (
            <div>
               <Header />
                <main>
                    {props.children}
                </main>
                <Menu />
            </div>
        )
    }else{
        return (
            <div>
                <div className={adminStyles.mainContainer} id={'admin-main--container'}>
                    {props.children}
                </div>
                <AdminNavbar selected={props.selected}/>
            </div>
        )
    }
}

export default Layout;

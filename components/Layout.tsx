import React,{useState,useEffect} from 'react';
import Header from "./Header";
import Menu from "./Menu";
import AdminNavbar from "./admin/AdminNavbar";
import layoutStyles from '../styles/Layout.module.css';
const Layout = props => {

    return (
        <React.Fragment>
            {!props.admin && <Header/>}
            <div className={props.admin ? layoutStyles.adminContainer : layoutStyles.webContainer}>
                {props.children}
            </div>
            {props.admin && <AdminNavbar selected={props.selected}/>}
        </React.Fragment>
    )
}

export default Layout;

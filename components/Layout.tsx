import React from 'react';
import Header from "./Header";
import layoutStyles from '../styles/Layout.module.css';
import Field from "./Field";

const Layout = (props) => {

    const isLanding = props.router.pathname === '/';
    return (
        <React.Fragment>
            <Header user={props.user} router={props.router} setUser={props.setUser}/>
            <main className={layoutStyles.webContainer}>
                {props.children}
            </main>
            {isLanding && <Field />}
        </React.Fragment>
    )
};

export default Layout;

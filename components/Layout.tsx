import React, {Dispatch, FunctionComponent} from 'react';
import Header from "./Header";
import layoutStyles from '../styles/Layout.module.css';
import {Router} from "next/router";
import {User} from "../utils/Authentication";


type Props = {
    router:Router,
    user:User,
    setUser:Dispatch<any>
}
const Layout : FunctionComponent<Props> = (props) => {
    return (
        <React.Fragment>
            <Header user={props.user} router={props.router} setUser={props.setUser}/>
            <main className={layoutStyles.webContainer}>
                {props.children}
            </main>
        </React.Fragment>
    )
};

export default Layout;

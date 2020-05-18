import React, {Dispatch, FunctionComponent, useEffect} from 'react';
import Header from "./Header";
import layoutStyles from '../styles/Layout.module.css';
import {Router} from "next/router";
import {User} from "../utils/Authentication";
import WebUtils from "../webUtils/WebUtils";


type Props = {
    router:Router,
    user:User,
    setUser:Dispatch<any>,
    utils:WebUtils,
    whiteboard?:boolean
}
const Layout : FunctionComponent<Props> = (props) => {

    useEffect(() => {
        if(props.router.pathname !== '/'){
            document.querySelector('body').style.position = 'fixed';
            document.querySelector('body').style.overflow = 'hidden';
            props.utils.initScroll();
        }
    },[]);

    return (
        <React.Fragment>
            <Header user={props.user} router={props.router} setUser={props.setUser} whiteboard={props.whiteboard}/>
            <main className={`${layoutStyles.webContainer} ${props.whiteboard ? layoutStyles.whiteBoardContainer : ''}`} data-scroll-section>
                {props.children}
            </main>
        </React.Fragment>
    )
};

export default Layout;

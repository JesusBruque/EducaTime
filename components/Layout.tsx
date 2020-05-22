import React, {Dispatch, FunctionComponent, useEffect} from 'react';
import Header from "./Header";
import layoutStyles from '../styles/Layout.module.css';
import {Router} from "next/router";
import {User} from "../utils/Authentication";
import WebUtils from "../webUtils/WebUtils";
import Head from "next/head";


type Props = {
    router:Router,
    user:User,
    setUser:Dispatch<any>,
    utils:WebUtils,
    whiteboard?:boolean
}
const Layout : FunctionComponent<Props> = (props) => {

    useEffect(() => {
        if(props.router.pathname !== '/' && !props.whiteboard){
            document.querySelector('body').style.position = 'fixed';
            document.querySelector('body').style.overflow = 'hidden';
            props.utils.initScroll();
        }
        if(props.whiteboard){
            document.querySelector('body').style.position = 'relative';
            document.querySelector('body').style.overflow = 'auto';
        }
    },[]);

    return (
        <React.Fragment>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/assets/logo.svg"/>
            </Head>
            <Header user={props.user} router={props.router} setUser={props.setUser} whiteboard={props.whiteboard}/>
            <main className={`${layoutStyles.webContainer} ${props.whiteboard ? layoutStyles.whiteBoardContainer : ''}`} data-scroll-section>
                {props.children}
            </main>
        </React.Fragment>
    )
};

export default Layout;

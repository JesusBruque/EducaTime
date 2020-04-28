import '../styles/styles.css';
import moment from 'moment';
import React, {useEffect, useState} from "react";
import WebUtils from "../webUtils/WebUtils";
import Router, {useRouter} from "next/router";
import axios from 'axios';
import {check} from "../utils/Authentication";
import App,{AppProps} from "next/app";

function MyApp({ Component, pageProps,pageUser }) {
    moment.locale('es');
    const [user,setUser] = useState(pageUser);
    const router = useRouter();
    let wu = new WebUtils('main');
    Router.events.on('routeChangeStart',() => {
        wu.initLoader();
        wu.startLoader();
    });

    const loadScroll = () => {
        wu.initScroll().then(() => {
            wu.removeLoader();
            wu.showHeader();
        });
    };

    useEffect(() => {
        loadScroll();
    },[router]);

    return (<Component {...pageProps} router={router} user={user} setUser={setUser}/>)
}
MyApp.getInitialProps = async (ctx) => {
    let pageProps = {};
    let user;
    if (App.getInitialProps ) {
        pageProps = await App.getInitialProps(ctx);
    }
    if(ctx.ctx.req && ctx.ctx.req.user){
        user = ctx.ctx.req.user;
    }
    return { ...pageProps,pageUser:user };
};
export default MyApp

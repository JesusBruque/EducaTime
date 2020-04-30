import '../styles/styles.css';
import 'plyr/dist/plyr.css';
import moment from 'moment';
import React, {useEffect, useState} from "react";
import WebUtils from "../webUtils/WebUtils";
import Router, {useRouter} from "next/router";
import App,{AppProps} from "next/app";
import Login from "./login";
import {route} from "next/dist/next-server/server/router";

function MyApp({ Component, pageProps,pageUser }) {
    moment.locale('es');
    const [user,setUser] = useState(pageUser);
    const router = useRouter();
    let wu = new WebUtils('main');
    Router.events.on('routeChangeStart',(url) => {
        wu.initLoader();
        wu.startLoader();
        console.log(url);
    });


    useEffect(() => {
        if((!user || user.rol !=='admin') && router.pathname.includes('admin')){
            router.push('/login');
        }
        wu.removeLoader();
        wu.showHeader();
    },[router]);

    return <Component  {...pageProps} router={router} user={user} setUser={setUser} utils={wu}/>
}
MyApp.getInitialProps = async (ctx) => {
    // let pageProps = {};
    let user;
    // if (App.getInitialProps ) {
    //     pageProps = await App.getInitialProps(ctx);
    // }
    if(ctx.ctx.req && ctx.ctx.req.user){
        user = ctx.ctx.req.user;
    }
    return { pageUser:user };
};
export default MyApp

import '../styles/styles.css';
import 'plyr/dist/plyr.css';
import moment from 'moment';
import React, {useEffect, useState} from "react";
import WebUtils from "../webUtils/WebUtils";
import Router, {useRouter} from "next/router";
import axios from 'axios';

function MyApp({ Component, pageProps,pageUser }) {
    moment.locale('es');
    const [user,setUser] = useState(pageUser);
    const router = useRouter();
    let wu = new WebUtils('main');
    let requestCounter = 0;
    Router.events.on('routeChangeStart',(url) => {
        wu.initLoader();
        wu.startLoader();
    });
    axios.interceptors.request.use((config) => {
        requestCounter++;
        if(requestCounter<2){
            wu.initLoader();
            wu.startLoader();
        }
        return config
    }, (error) => {
        wu.removeLoader();
        return Promise.reject(error);
    });
    axios.interceptors.response.use((response) => {
        requestCounter--;
        if(requestCounter<1){
            wu.removeLoader();
        }
        return response;
    }, (error) => {
        wu.removeLoader();
        return Promise.reject(error);
    });

    const [lateralOpen, setLateralOpen] = useState(false);

    useEffect(() => {
        if((!user || !user.roles.includes('admin')) && router.pathname.includes('admin')){
            router.push('/login');
        }
        if(!user && router.pathname.includes('whiteboard')){
            router.push('/login');
        }

        wu.removeLoader();
    },[router]);

    return <Component  {...pageProps} router={router} user={user} setUser={setUser} utils={wu} lateralOpen={lateralOpen} setLateralOpen={setLateralOpen} />
}
MyApp.getInitialProps = async (ctx) => {
    let user;
    if(ctx.ctx.req && ctx.ctx.req.user){
        user = ctx.ctx.req.user;
    }
    return { pageUser:user };
};
export default MyApp

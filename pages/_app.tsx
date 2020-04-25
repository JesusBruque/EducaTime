import { AppProps } from 'next/app'
import '../styles/styles.css';
import moment from 'moment';
import Router, {useRouter} from 'next/Router';
import WebUtils from "../webUtils/WebUtils";
import Layout from "../components/Layout";
import React,{useEffect, useState} from "react";
import Entrada from "../components/Entrada";
import dynamic from "next/dist/next-server/lib/dynamic";
import gsap from "gsap";
import Field from "../components/Field";

function MyApp({ Component, pageProps }: AppProps) {
    moment.locale('es');

    const router = useRouter();
    const [isAdmin,setIsAdmin] = useState(false);
    const [optionSelected,setOptionSelected] = useState('');
    const [isLanding,setIsLanding] = useState(false);

    let wu = new WebUtils('main');

    Router.events.on('routeChangeStart',(err,url) => {
        wu.initLoader();
        wu.startLoader();
    });


    const loadScroll = () => {
        wu.initScroll().then(() => wu.removeLoader());
    };

    useEffect(() =>{
        console.log(router);
        if(router.pathname.includes('admin')){
            let subr = router.pathname.split('/')[2];
            setOptionSelected(subr);
            setIsAdmin(true);
        }
        /*---- LANDING ----*/
        if(router.pathname === '/'){
            setIsLanding(true);
        }else{
            setIsLanding(false);
            loadScroll();
        }
    },[setIsAdmin,router]);
    return (
        <div>
            {isLanding ? <Component {...pageProps}/> :
                <Layout admin={isAdmin} selected={optionSelected}>
                    <Component {...pageProps} utils={wu}/>
                </Layout>}
        </div>
    )
}

export default MyApp

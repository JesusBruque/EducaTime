import { AppProps } from 'next/app'
import '../styles/styles.css';
import moment from 'moment';
import Router, {useRouter} from 'next/Router';
import WebUtils from "../webUtils/WebUtils";
import Layout from "../components/Layout";
import React,{useEffect, useState} from "react";

function MyApp({ Component, pageProps }: AppProps) {
    moment.locale('es');

    const router = useRouter();
    const [isAdmin,setIsAdmin] = useState(false);
    const [optionSelected,setOptionSelected] = useState('');

    let wu = new WebUtils('main');
    Router.events.on('routeChangeStart',(err,url) => {
        wu.initLoader();
        wu.startLoader();
    });
    // Router.events.on('routeChangeComplete',(err,url) => {
    //     wu.initScroll().then(() => {
    //         // wu.removeLoader();
    //     });
    // });
    useEffect(() =>{
        console.log(router);
        if(router.pathname.includes('admin')){
            let subr = router.pathname.split('/')[2];
            setOptionSelected(subr);
            setIsAdmin(true);
        }
        console.log('efecto router');
        wu.initScroll().then(() => wu.removeLoader());
    },[setIsAdmin,router]);
    return (
        <div>
            <Layout admin={isAdmin} selected={optionSelected}>
                <Component {...pageProps} utils={wu}/>
            </Layout>
        </div>
    )
}

export default MyApp

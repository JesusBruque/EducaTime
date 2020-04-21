import { AppProps } from 'next/app'
import '../styles/styles.css';
import {useEffect, useState} from "react";
import moment from 'moment';

function MyApp({ Component, pageProps }: AppProps) {
    moment.locale('es');

    return <Component {...pageProps} />
}

export default MyApp

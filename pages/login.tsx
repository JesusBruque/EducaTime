import loginStyles from '../styles/Login.module.css';
import React, {useState} from 'react';
import LoginForm from "../components/LoginForm";
import Button from "../components/Button";
import {login} from "../utils/Authentication";

const Login = () => {
    // const router = useRouter();

    const [credentials,setCredentials] = useState({email:'',password:''});
    const onSubmit = () => {
        login(credentials).then((res) => {
            if (res.data.status === 200) {
                // router.push('/')
            }
        }).catch(err => {

        });
    };
    const buttons = [<Button key="buttonCliente" type="submit" color={'black'} text={'Iniciar sesión'} styles={{width:'80%',margin:'15px 0'}} />];

    return (
        <div className={loginStyles.loginContainer}>
            <img src={'/assets/fondo-1.svg'} alt={'imagen de fondo'}/>
            <img src={'/assets/fondo-2.svg'} alt={'imagen de fondo'}/>
            <div className={loginStyles.loginForm}>
                <img src={'/assets/logo_letras.png'} alt={'logo de casor'}/>
                <LoginForm userInfo={credentials} setUserInfo={setCredentials} buttons={buttons} onSubmit={onSubmit}/>
            </div>
        </div>
    )
};

export default Login;

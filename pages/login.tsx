import loginStyles from '../styles/Login.module.css';
import React, {useEffect, useState} from 'react';
import LoginForm from "../components/LoginForm";
import Button from "../components/Button";
import {login} from "../utils/Authentication";
import Layout from "../components/Layout";

const Login = (props) => {
    const [credentials,setCredentials] = useState({email:'',password:''});

    const onSubmit = () => {
        login(credentials).then((res) => {
            if (res.data.status === 200) {
                props.setUser(res.data.user);
                let roles = res.data.user.roles;
                redirect(roles);
            }
        }).catch(err => {
            window.alert('usuario y/o contraseña erróneos.')
        });
    };

    useEffect(() => {
        if(props.user){
            redirect(props.user.roles);
        }
    },[]);

    const redirect = (roles) => {
        if(!roles.includes('admin')){
            props.router.push('/whiteboard');
        }else{
            props.router.push('/admin/formacion');
        }
    };

    const buttons = [<Button key="buttonCliente" type="submit" color={'black'} text={'Iniciar sesión'} styles={{width:'80%',margin:'15px 0'}} />,<Button key="buttonForgotPass" type="submit" color={'black'} text={'Olvidé contraseña'} styles={{width:'80%',margin:'15px 0'}} />];

    return (
        <Layout router={props.router} user={props.user} setUser={props.setUser} utils={props.utils}>
            <div className={loginStyles.loginContainer}>
                <img src={'/assets/fondo-1.svg'} alt={'imagen de fondo'}/>
                <img src={'/assets/fondo-2.svg'} alt={'imagen de fondo'}/>
                <div className={loginStyles.loginForm}>
                    <img src={'/assets/logo_letras.png'} alt={'logo de casor'}/>
                    <LoginForm userInfo={credentials} setUserInfo={setCredentials} buttons={buttons} onSubmit={onSubmit}/>
                </div>
            </div>
        </Layout>
    )
};

export default Login;

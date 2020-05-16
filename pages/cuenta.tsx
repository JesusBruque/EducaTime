import Layout from "../components/Layout";
import utilsStyles from "../styles/Utils.module.css";
import CursoGrid from "../components/cursos/CursosGrid";
import React, {useState} from "react";
import Form from "../components/Form";
import Button from "../components/Button";
import {editUserInfo} from '../utils/Authentication';
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import SnackBar from "../components/SnackBar";

const Cuenta = (props) => {
    const [userInfo,setUserInfo] = useState({name:props.user.name,apellidos:props.user.apellidos,username:props.user.username,email:props.user.email,password:''});
    const [errors, setErrors] = useState(props.errors || Object);
    const [success,setSuccess] = useState(false);

    const inputs = [
        { property: 'name',label:'Nombre', name: 'name', type: 'text', validators: ['required']},
        { property: 'apellidos',label:'Apellidos', name: 'apellidos', type: 'text'},
        { property: 'username',label:'Nombre de usuario', name: 'name', type: 'text', validators: ['required']},
        { property: 'email',label:'Email', name: 'email', type: 'text', validators: ['required']},
        { property: 'password',label:'Contraseña', name: 'password', type: 'password'},
    ];
    const buttons = [<Button color={'blue'} text={'Guardar'} type={'submit'} key={'one boton'}/>];

    const handleSubmit = () => {
        props.utils.initLoader();
        props.utils.startLoader();
        editUserInfo(userInfo).then(res => {
            if(res.status === 200){
                props.utils.removeLoader();
                setSuccess(true);
                setUserInfo({...userInfo,password:''});
                setTimeout(() => {setSuccess(false)},3000);
            }else{
                props.utils.removeLoader();
                window.alert('error');
            }
        }).catch(err => console.error(err));
    };
    return (
        <Layout user={props.user} setUser={props.setUser} utils={props.utils} router={props.router} >
            <div className={utilsStyles.sectionContainer}>
                <h1 className={utilsStyles.sectionTitle}>Mi Perfil</h1>
                <div className={utilsStyles.centeredContainer}>
                    <div style={{padding:'30px',border:'solid 1px var(--black-color)'}}>
                        <Form values={userInfo} setValues={setUserInfo} errors={errors} setErrors={setErrors} buttons={buttons} onSubmit={handleSubmit} inputs={inputs}/>
                    </div>
                </div>
            </div>
            {success && <SnackBar time={3000} color={'#577A4A'} text={'Información editada con éxito'} icon={faCheckCircle} />}
        </Layout>
    )
};

export default Cuenta;

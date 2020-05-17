import React, { useState, Dispatch, FunctionComponent } from 'react';
import { forgetPassword } from "../utils/Authentication";
import Form from "./Form";
import Button from './Button';

type Props = {
    setForgetPassword: Dispatch<any>
}

const ForgetPassword: FunctionComponent<Props> = ({ setForgetPassword }) => {
    const [mensaje, setMensaje] = useState(null)
    const [userInfo, setUserInfo] = useState({ email: '' })
    const [errors, setErrors] = useState(Object);
    const buttons = [<Button key="buttonForgetPassword" type="submit" color={'black'} text={'Enviar nueva contraseña'} styles={{ width: '80%', margin: '15px 0' }} />,
    <Button key="buttonCancelar" action={() => { setForgetPassword(false) }} color={'black'} text={'Cancelar'} styles={{ width: '80%', margin: '15px 0' }} />]
    const inputs = [
        { property: 'email', placeHolder: 'Correo electrónico', name: 'email', type: 'text', validators: ['required', 'email'], icon: '/assets/icons/user-icon.svg' }];
    const onSubmit = () => {
        forgetPassword(userInfo.email).then(res => {
            if (res.data.status === 200) {
                setMensaje('Se ha enviado una nueva contraseña. Revise su buzón de correo electrónico.')
            }
        })

    }
    if (mensaje) return <span>{mensaje}</span>
    return (
        <Form
            values={userInfo}
            setValues={setUserInfo}
            errors={errors}
            setErrors={setErrors}
            inputs={inputs}
            buttons={buttons}
            onSubmit={onSubmit}
        />
    )
};

export default ForgetPassword;

import React, { useState, Dispatch, FunctionComponent } from 'react';
import { forgetPassword } from "../utils/Authentication";
import Form from "./Form";
import Button from './Button';
import {Router} from "next/router";

type Props = {
    setForgetPassword: Dispatch<any>
}

const ForgetPassword: FunctionComponent<Props> = (props) => {
    const { setForgetPassword } = props;
    const [userInfo, setUserInfo] = useState({ email: '' });
    const [errors, setErrors] = useState(Object);
    const buttons = [<Button key="buttonForgetPassword" type="submit" color={'blue'} text={'Restablecer'} styles={{ margin: '15px 8px 15px 0' }} />,
    <Button key="buttonCancelar" action={() => { setForgetPassword(false) }} color={'red'} text={'Cancelar'} styles={{ color: 'white', margin: '15px 0' }} />];

    const inputs = [
        { property: 'email', placeHolder: 'Correo electrónico', name: 'email', type: 'text', validators: ['required', 'email'], icon: '/assets/icons/user-icon.svg' }];

    const onSubmit = () => {
        forgetPassword(userInfo.email).then(res => {
            if (res.data.status === 200) {
               setForgetPassword(false);
            }
        });
    }
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

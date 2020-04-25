import React, {useState,Dispatch,FunctionComponent} from 'react';
import Form from "./Form";

type Props = {
    userInfo: Object,
    setUserInfo: Dispatch<any>,
    buttons,
    onSubmit: () => void,
    errors?:Object
}

const LoginForm :FunctionComponent<Props> = (props) => {
    const { userInfo, setUserInfo, buttons, onSubmit } = props;
    const [errors, setErrors] = useState(props.errors || Object);
    const inputs = [
        { property: 'usuario', placeHolder: 'Usuario', name: 'usuario', type: 'text', validators: ['required'] ,icon:'/assets/icons/user-icon.svg'},
        { property: 'password', placeHolder: 'Contraseña', name: 'password', type: 'password', validators: ['required'],icon:'/assets/icons/lock.svg' }
    ];
    return (
        <Form
            values={userInfo}
            setValues={setUserInfo}
            errors={errors}
            setErrors={setErrors}
            inputs={inputs}
            buttons={buttons}
            onSubmit={onSubmit}
        >
            {props.children}
        </Form>
    )
};

export default LoginForm;

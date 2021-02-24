import React, { Dispatch, FunctionComponent, useState, useEffect } from "react";
import inputStyles from '../styles/Input.module.css';
import { validateInput } from "../utils/Validators";

type Props = {
    value: any,
    setValue: Dispatch<any>,
    type: string,
    name: string,
    validators?: string[],
    customValidations?: Function[],
    placeHolder?: string,
    required?: boolean,
    icon?: string,
    label?: string,
    error?: Object,
    setError?: Dispatch<any>,
    className?:string,
    styles?:Object
}

const Input: FunctionComponent<Props> = ({ value, setValue, validators, customValidations, icon, label, error, setError, type, name, placeHolder, required,className,styles}) => {
    const handleChanges = (e) => {
        const val = e.target.value;
        setValue(val);
        if ((validators || customValidations) && setError) {
            const err = validateInput(val, validators, customValidations);
            setError(err);
        }
    };
    const handleBlur = (e) => {
        handleChanges(e);
    };
    return (
        <div className={`${inputStyles.inputContainer} ${icon ? inputStyles.iconInput : ''} ${className}`} style={styles}>
            {label && <label htmlFor={name}>{label}</label>}
            {icon && <img src={icon} className={inputStyles.iconElement} alt={'icono del input'}/>}
            <input
                onBlur={handleBlur}
                name={name}
                className={`${inputStyles.input} ${icon ? inputStyles.icon : ''} ${required ? inputStyles.required : ''} `}
                value={value || ''}
                onChange={handleChanges}
                type={type}
                placeholder={placeHolder} />
            {error && <span className={inputStyles.error}>{error}</span>}
        </div>
    )
}

export default Input;

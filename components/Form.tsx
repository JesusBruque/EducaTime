import { Dispatch, FunctionComponent, useEffect, useState } from 'react';
import Input from './Input';
import { validateForm, hasErrors } from "../utils/Validators";

type Props = {
    values: any,
    setValues: Dispatch<any>,
    errors: Object,
    setErrors: Dispatch<any>,
    buttons,
    onSubmit: () => void,
    inputs: Array<{
        property: string,
        name: string,
        type: string,
        icon?: string,
        label?: string,
        placeHolder?: string,
        required?: boolean,
        validators?: string[],
        handleChange?: () => void,
        items?,
        customValidations?: Function[]
    }>
    styles?:{}
}
const Form: FunctionComponent<Props> = ({ values, setValues, errors, setErrors, buttons, onSubmit, inputs, children,styles }) => {
    const submit = (e) => {
        e.preventDefault();
        const err = validateForm(values, inputs);
        setErrors(err);
        if (!hasErrors(err)) {
            onSubmit();
        }
    }
    return (
        <div style={styles}>
            <form onSubmit={submit}>
                {inputs.map((input, i) => {
                    const setError = (err: string) => setErrors({ ...errors, [input.property]: err });
                    let value = values ? values[input.property] : '';
                    const setValue = (val: string | number) => setValues({ ...values, [input.property]: val });
                    return <Input
                        key={i + input.property}
                        value={value}
                        setValue={setValue}
                        type={input.type}
                        name={input.name}
                        required={input.required}
                        validators={input.validators}
                        customValidations={input.customValidations}
                        error={errors[input.property]}
                        setError={setError}
                        label={input.label}
                        icon={input.icon}
                        placeHolder={input.placeHolder}
                    />
                })}
                {buttons.map(button => {
                    return button
                })}
            </form>
            {children}
        </div>
    )

};
export default Form;

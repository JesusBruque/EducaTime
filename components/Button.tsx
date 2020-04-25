import buttonStyles from '../styles/Button.module.css';
import React, { FunctionComponent } from "react";

type Props = {
    color: string,
    text: string,
    action?: () => void,
    type?: "button" | "submit" | "reset",
    icon?: string
    styles?:{}
}

const Button: FunctionComponent<Props> = ({ color, text, action, type, icon, styles }) => {

    function getColor(color: string) {
        switch (color) {
            case 'black':
                return { backgroundColor: 'var(--black-color)',color:'var(--main-color)' };
            case 'blue':
                return { backgroundColor: 'var(--main-color)',color:'var(--black-color)' };
            default:
                return { backgroundColor: color }
        }
    }

    return (
        <button type={type ? type : 'button'} onClick={action} className={`${(buttonStyles.btn)}  ${(icon ? buttonStyles.icon : '')}`} style={Object.assign({},getColor(color),styles)}>
            {icon && <img src={icon} alt={'icono del input'}/>}
            {text}
        </button>
    )
};

export default Button;

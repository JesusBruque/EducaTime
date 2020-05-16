import React, {Dispatch, FunctionComponent} from "react";
import styles from '../styles/ErrorsPanel.module.css';
import utilStyles from '../styles/Utils.module.css';

type Props = {
    errors:{}[],
    close:() => void
}
const ErrorsPanel : FunctionComponent<Props> = (props:Props) => {
    return (
        <div className={styles.container}>
            <div className={utilStyles.background} onClick={props.close}></div>
            <div className={styles.panel}>
                <h4>Se han detectado los siguientes errores:</h4>
                {props.errors.map((error,i) => {
                    return <div key={i} className={styles.error}><span>{Object.keys(error)[0]}: </span><span>{Object.values(error)[0]}</span></div>
                })}
            </div>
        </div>
    )
};

export default ErrorsPanel;

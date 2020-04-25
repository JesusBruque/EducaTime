import {FunctionComponent} from "react";
import modalStyles from '../styles/Modal.module.css';

type Props = {
    body:HTMLElement
}
const Modal : FunctionComponent<Props> = (props) => {
    return (
        <div className={modalStyles.modalContainer}>
            <div className={modalStyles.backgroundModal}></div>
            <div className={modalStyles.modalBody}>
                {props.body}
            </div>
        </div>
    )
};

export default Modal;

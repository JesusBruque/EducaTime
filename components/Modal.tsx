import React, {Dispatch, FunctionComponent} from "react";
import modalStyles from '../styles/Modal.module.css';
import ReactDOM from "react-dom";

type Props = {
    open:boolean,
    setOpen:Dispatch<boolean>
}
const Modal : FunctionComponent<Props> = (props) => {
    if(!document.getElementById('modal-container')){
        let element = document.createElement('div');
        element.id = 'modal-container';
        document.querySelector('#__next').appendChild(element);
    }
    const ModalContent = () => {
        return (
            <div className={modalStyles.modalContainer}>
                {props.open && <React.Fragment>
                    <div className={modalStyles.backgroundModal} onClick={() => props.setOpen(false)}></div>
                    <div className={modalStyles.modalBody}>
                        {props.children}
                    </div>
                </React.Fragment>}
            </div>
        )
    }

    return ReactDOM.createPortal(ModalContent(),document.getElementById('modal-container'));
};

export default Modal;

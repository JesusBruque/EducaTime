import React, {Dispatch, FunctionComponent} from "react";
import Modal from "./Modal";
import Button from "./Button";

type Props = {
    open:boolean,
    onDelete:() => void,
    text:string,
    setOpen:Dispatch<boolean>
}
const ModalDelete: FunctionComponent<Props> = (props) => {
    const handleDelete = () => {
        props.onDelete();
        props.setOpen(false);
    }
    return (
        <Modal open={props.open}>
            <span style={{fontSize:'1.2em',fontWeight:'bold'}}>{props.text}</span>
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-around',marginTop:'30px'}}>
                <Button color={'blue'} text={'Si, estoy seguro'} styles={{marginRight:'8px'}} action={handleDelete}/>
                <Button color='red' text={'No, deseo cancelar'} action={() => props.setOpen(false)}/>
            </div>
        </Modal>
    )
}

export default ModalDelete;

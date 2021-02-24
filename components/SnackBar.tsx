import {FunctionComponent, useEffect,useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from '../styles/SnackBar.module.css';
import {IconDefinition} from "@fortawesome/fontawesome-common-types";

type Props = {
    time:number,
    color:string,
    text:string,
    icon?:IconDefinition
}
const SnackBar : FunctionComponent<Props> = (props) => {
    const [visible,setVisible] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setVisible(false)
        },props.time);
    },[]);
    return (
        <div className={`${styles.container} ${visible ? styles.visible :''}`} style={{backgroundColor:props.color}}>
            {props.icon && <FontAwesomeIcon icon={props.icon} />}
            <span>{props.text}</span>
         </div>
    )
}

export default SnackBar;

import React, {FunctionComponent, useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import styles from '../styles/Dropzone.module.css';

type Props = {
    text?:string,
    image?:string,
    filesAccepted?:string[],
    maxFiles?:number,
    onAcceptFile?:(files) => void,
    disabled?:boolean
}
const MyDropzone: FunctionComponent<Props> = (props) => {

    const onDrop = useCallback(acceptedFiles => {
        if(props.maxFiles && acceptedFiles.length>props.maxFiles) return false;
        if(props.onAcceptFile){
            props.onAcceptFile(acceptedFiles);
        }
    }, [props.onAcceptFile]);


    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop,accept:props.filesAccepted,disabled:props.disabled});

    return (
        <div {...getRootProps({className: 'dropzone'})} className={styles.dropzone}>
            <input {...getInputProps()} />
            <img src={props.image ? props.image : '/assets/icons/camera.svg'} className={styles.imageIcon}/>
            <p>{!props.text ? 'Arrastra y suelta los ficheros aquí, o haz click para seleccionar los ficheros' : props.text}</p>
            {props.children}
        </div>
    );
};

export default MyDropzone;

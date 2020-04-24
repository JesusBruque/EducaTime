import React, {FunctionComponent, useEffect, useState} from 'react';
import styles from '../styles/DragNDrop.module.css';
import ImageEditable from "./ImageEditable";
import {Editor} from "@tinymce/tinymce-react/lib/cjs/main/ts";
type Props = {
    handleDrop?:(files) => void,
    styles?:{},
    maxFiles?:number,
    onlyImages?:boolean
}
const DragNDrop: FunctionComponent<Props> = props => {
    const [dragging,setDragging] = useState(false);

    const [files,setFiles] = useState([]);
    let counter = 0;

    const handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDragging(true);
            counter++;
            console.log(counter);
        }
    };
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.currentTarget);
        counter--;
        if(counter < 0){
            setDragging(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        let items = e.dataTransfer.files;
        if ( items && items.length > 0) {
            let newFiles = [...files];
            for(let i = 0; i<items.length;i++){
                if(props.onlyImages && !items[i].type.includes('image')){
                    return false;
                }
                newFiles.push(items[i]);
            }
            props.handleDrop && props.handleDrop(e.dataTransfer.files);

            setFiles(newFiles);
            e.dataTransfer.clearData();
            counter = 0;
        }
    };



    return (
        <div onDragEnter={handleDragIn}
             onDragLeave={handleDragOut}
             onDragOver={handleDrag}
             onDrop={handleDrop}
             id={'drop-container'}
             className={`${styles.container} ${dragging ? styles.dragging : ''}`}
             style={props.styles}>

                {dragging && <div className={styles.dragInfo}>Suelta aquí :)</div>}

                {files.map(file => {
                    return <ImageEditable image={URL.createObjectURL(file)} height={100} width={100} description={'imagen para el dropzone'}/>
                })}

                {props.children}
                {/*<Editor  apiKey={'aa13c29c42l5mpi8281hguqa32m1bynlerbb4ioo57rbmsi3'}*/}
                {/*         init={{*/}
                {/*             height: 500,*/}
                {/*             language:'es',*/}
                {/*             menubar: 'insert',*/}
                {/*             plugins: [*/}
                {/*                 'advlist autolink lists link image charmap print preview anchor',*/}
                {/*                 'searchreplace visualblocks code fullscreen',*/}
                {/*                 'insertdatetime media table paste code help wordcount',*/}
                {/*                 'image'*/}
                {/*             ],*/}
                {/*             toolbar:*/}
                {/*                 'undo redo | formatselect | bold italic backcolor | \*/}
                {/*                 alignleft aligncenter alignright alignjustify | \*/}
                {/*                 bullist numlist outdent indent | removeformat | help1 image ',*/}
                {/*             image_caption: true,*/}
                {/*             image_upload_url:'',*/}
                {/*         }}*/}
                {/*         />*/}
        </div>
    )
};

export default DragNDrop;

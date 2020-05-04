import {Editor} from "@tinymce/tinymce-react/lib/cjs/main/ts";
import fetch from "isomorphic-unfetch";
import React, {useState} from 'react';
import WebUtils from "../webUtils/WebUtils";

const TextEditor = (props:{onChange:(content)=>void,files:boolean,height:number,initialValue:string,basic:boolean,utils:WebUtils}) => {

    const [dragging,setDragging] = useState(false);
    const [files,setFiles] = useState([]);
    let counter = 0;

    const uploadImage = async () => {
        const response = await fetch('http://localhost:5000/api/blog/uploadImage/10',{method:'POST'});
        console.log(response);
    };
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDragging(true);
            counter++;
            console.log(counter);
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        let items = e.dataTransfer.files;
        // if ( items && items.length > 0) {
        //     let newFiles = [...files];
        //     for(let i = 0; i<items.length;i++){
        //         if(props.onlyImages && !items[i].type.includes('image')){
        //             return false;
        //         }
        //         newFiles.push(items[i]);
        //     }
        //     props.handleDrop && props.handleDrop(e.dataTransfer.files);
        //
        //     setFiles(newFiles);
        //     e.dataTransfer.clearData();
        //     counter = 0;
        // }
        console.log(items);
    };

    const loadedEditor = (ed) => {
        props.utils.initLoader();
        props.utils.startLoader();
        ed.on('init', () => {
            props.utils.removeLoader();
        });
    };
    const handleChange = (content) => {
        props.onChange(content);
    };

    const editorToolbar = `undo redo | formatselect | bold italic backcolor | 
                            ${props.basic ? '' : 'alignleft aligncenter alignright alignjustify'} | 
                                bullist numlist outdent indent | removeformat | help1 ${props.files ? 'image' : ''} `;

    const editorPlugins = ['advlist autolink lists link image charmap print preview anchor','searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount',`${props.files ? 'image' : ''}`];


    return (
        <Editor apiKey={'aa13c29c42l5mpi8281hguqa32m1bynlerbb4ioo57rbmsi3'}
                initialValue={props.initialValue}
                init={{
                    height: props.height,
                    language:'es',
                    menubar: props.basic ? '' : 'insert',
                    plugins: editorPlugins,
                    toolbar:editorToolbar,
                    image_caption: props.files,
                    image_upload_url:'',
                    images_upload_handler:props.files ? uploadImage : null,
                    setup: loadedEditor
                }}
                onEditorChange={handleChange}
                onDragOver={handleDrag}
                onDrop={handleDrop}
        />
        )
};

export default TextEditor;

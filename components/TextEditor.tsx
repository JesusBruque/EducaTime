import {Editor} from "@tinymce/tinymce-react/lib/cjs/main/ts";
import fetch from "isomorphic-unfetch";
import React, {useState} from 'react';

const TextEditor = (props) => {

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

    const loadedEditor = (ed) => {
        props.utils.initLoader();
        ed.on('init', () => {
            props.utils.initScroll().then(() => {
                props.utils.removeLoader();
            });
        });
    };


    return (
        <Editor apiKey={'aa13c29c42l5mpi8281hguqa32m1bynlerbb4ioo57rbmsi3'}
                init={{
                    height: 500,
                    language:'es',
                    menubar: 'insert',
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount',
                        'image'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help1 image ',
                    image_caption: true,
                    image_upload_url:'',
                    images_upload_handler:uploadImage,
                    setup: loadedEditor
                }}
                onActivate={() => {console.log('activado')}}
                onDragOver={handleDrag}
                onDrop={handleDrop}
        />
        )
};

export default TextEditor;

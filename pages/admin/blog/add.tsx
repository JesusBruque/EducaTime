import Layout from "../../../components/Layout";
import utilsStyles from "../../../styles/Utils.module.css";
import React, {useEffect, useRef, useState} from "react";
import blogsModule from "../../../styles/Blog.module.css";
import WebUtils from "../../../webUtils/WebUtils";
import DragNDrop from "../../../components/DragNDrop";
import dynamic from "next/dynamic";

const AddBlog = (props) => {

    const alloyRef = useRef(null);
    const [mainImage,setMainImage] = useState(null);
    const TextEditor = dynamic(() =>import('../../../components/TextEditor'), { ssr:false});
    useEffect(() => {
       props.utils.initLoader();
       props.utils.initScroll().then(() => {
           props.utils.removeLoader();
       });
       console.log('efecto tecto');
    },[]);
    return (
        <div className={utilsStyles.sectionContainer}>
            <h1 className={`${blogsModule.title} ${utilsStyles.sectionTitle}`}>Añadir Entrada</h1>
            <div>
                <label>
                    <div className={blogsModule.addImageContainer}>
                        <input type='file' name={'upload-image'} style={{display:'none'}}/>
                        <img src={'/assets/icons/camera.svg'} alt='icono de camára'/>
                    </div>
                </label>
            </div>
            {/*<DragNDrop styles={{height:'200px',width:'200px'}}  onlyImages={true}>*/}
            {/*    {mainImage && <img src={URL.createObjectURL(mainImage)}/>}*/}
            {/*</DragNDrop>*/}
            <TextEditor utils={props.utils}/>
        </div>
    )
}

export default AddBlog;

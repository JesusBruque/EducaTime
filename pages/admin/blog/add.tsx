import utilsStyles from "../../../styles/Utils.module.css";
import React, {useState} from "react";
import LayoutAdmin from "../../../components/LayoutAdmin";
import Blog from "../../../utils/Blog";
import Button from "../../../components/Button";
import AddBlogForm from "../../../components/blog/AddBlogForm";
import ErrorsPanel from "../../../components/ErrorsPanel";
import {validate,create} from "../../../utils/Blog";

const AddBlog = (props) => {

    const [blogInfo,setBlogInfo] = useState(new Blog());
    const [contentFiles,setContentFiles] = useState([]);
    const [blogThumbnail,setBlogThumbnail] = useState(null);
    const [errors,setErrors] = useState(null);
    const CreateBlog = () => {
        validate(blogInfo).then(() => {
            props.utils.initLoader('Subiendo blog...');
            props.utils.startLoader();
            create(blogInfo).then(() => {
                props.utils.removeLoader();
                props.router.push('/admin/blog');
            }).catch(() =>{
                window.alert('ERROR CREANDO EL BLOG');
                props.utils.removeLoader();
            });
        }).catch(errors => {
            setErrors(errors);
        });
    };

    return (
        <LayoutAdmin router={props.router} user={props.user} setUser={props.setUser} utils={props.utils} selected={'blog'}>
            <div className={utilsStyles.sectionContainer}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',alignItems:'center'}}>
                    <h1 className={`${utilsStyles.sectionTitle}`}>Añadir Entrada</h1>
                    <Button color={'blue'} text={'Guardar entrada'} action={CreateBlog}/>
                </div>
                <div>
                   <AddBlogForm blog={blogInfo} setBlog={setBlogInfo} utils={props.utils} files={contentFiles} setFiles={setContentFiles} blogFile={blogThumbnail} setBlogFile={setBlogThumbnail}/>
                </div>

            </div>
            {errors && <ErrorsPanel errors={errors} close={() => setErrors(null)}/>}
        </LayoutAdmin>
    )
}

export default AddBlog;

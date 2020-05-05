import utilsStyles from "../../../styles/Utils.module.css";
import React, {useState} from "react";
import LayoutAdmin from "../../../components/LayoutAdmin";
import Blog from "../../../utils/Blog";
import Button from "../../../components/Button";
import AddBlogForm from "../../../components/blog/AddBlogForm";

const AddBlog = (props) => {

    const [blogInfo,setBlogInfo] = useState(new Blog());
    const [contentFiles,setContentFiles] = useState([]);
    const [blogThumbnail,setBlogThumbnail] = useState(null);

    const CreateBlog = () => {

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
        </LayoutAdmin>
    )
}

export default AddBlog;

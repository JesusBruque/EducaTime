import React, {Dispatch, FunctionComponent, useState} from "react";
import Blog, {edit, uploadBlogFile, validate,getBlogById} from "../../../utils/Blog";
import LayoutAdmin from "../../../components/LayoutAdmin";
import utilsStyles from "../../../styles/Utils.module.css";
import Button from "../../../components/Button";
import AddBlogForm from "../../../components/blog/AddBlogForm";
import ErrorsPanel from "../../../components/ErrorsPanel";
import {Router} from "next/router";
import WebUtils from "../../../webUtils/WebUtils";
import {User} from "../../../utils/Authentication";

type Props = {
    blog:Blog,
    router:Router,
    utils:WebUtils,
    user:User,
    setUser:Dispatch<any>
}
const editBlog : FunctionComponent<Props> = (props) => {

    const [blogInfo,setBlogInfo] = useState(props.blog);
    const [contentFiles,setContentFiles] = useState([]);
    const [blogThumbnail,setBlogThumbnail] = useState(null);
    const [errors,setErrors] = useState(null);

    const EditBlog = () => {
        validate(blogInfo).then(() => {
            props.utils.initLoader('Editando blog...');
            props.utils.startLoader();
            let updateThumbnail = new Promise<string>((resolve,reject) => {
                if(blogThumbnail){
                    uploadBlogFile(blogThumbnail).then(res => {
                        resolve(res.data.location)
                    }).catch(err => reject(err))
                }else{
                    resolve(blogInfo.thumbnail)
                }
            });

            updateThumbnail.then(res => {
                blogInfo.thumbnail = res;
                edit(blogInfo).then(() => {
                    props.utils.removeLoader();
                    props.router.push('/admin/blog');
                }).catch(() =>{
                    window.alert('ERROR EDITANDO EL BLOG');
                    props.utils.removeLoader();
                });
            })
        }).catch(errors => {
            setErrors(errors);
        });
    };

    return (
        <LayoutAdmin router={props.router} user={props.user} setUser={props.setUser} utils={props.utils} selected={'blog'}>
            <div className={utilsStyles.sectionContainer}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',alignItems:'center'}}>
                    <h1 className={`${utilsStyles.sectionTitle}`}>Editar Entrada</h1>
                    <Button color={'blue'} text={'Guardar cambios'} action={EditBlog}/>
                </div>
                <div className={utilsStyles.centeredContainer}>
                    <AddBlogForm blog={blogInfo} setBlog={setBlogInfo} utils={props.utils} files={contentFiles} setFiles={setContentFiles} blogFile={blogThumbnail} setBlogFile={setBlogThumbnail}/>
                </div>

            </div>
            {errors && <ErrorsPanel errors={errors} close={() => setErrors(null)}/>}
        </LayoutAdmin>
    )
}

export const getServerSideProps =  async ctx => {
    const res = await getBlogById(ctx.params.editId);
    const blog = res.data.Blog;
    console.log(blog);
    return {props:{blog:blog}}
};

export default editBlog;

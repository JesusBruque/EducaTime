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
import fetch from "isomorphic-unfetch";

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
    const [blogVideo,setBlogVideo] = useState(null);

    const EditBlog = () => {
        validate(blogInfo).then(() => {
            props.utils.changeTextLoader('Editando blog...');
            let updateThumbnail = new Promise<string>((resolve,reject) => {
                if(blogThumbnail){
                    uploadBlogFile(blogThumbnail,false,blogInfo.title).then(res => {
                        resolve(res.data.location)
                    }).catch(err => reject(err))
                }else{
                    resolve(blogInfo.thumbnail)
                }
            });

            updateThumbnail.then(res => {
                let prVideo = new Promise<string>((resolve,reject) => {
                    if(blogVideo){
                        uploadBlogFile(blogVideo,true,blogInfo.title).then(res => {
                            resolve(res.data.location);
                        }).catch((err) =>{
                            window.alert('Errror al subir el videoblog');
                            reject(err);
                        });
                    }else{
                        resolve(blogInfo.video);
                    }
                });
                blogInfo.thumbnail = res;
                prVideo.then(res => {
                    blogInfo.video = res;
                    edit(blogInfo).then(() => {
                        props.router.push('/admin/blog');
                    }).catch(() =>{
                        window.alert('ERROR EDITANDO EL BLOG');
                    });
                }).catch(err => window.alert('error editando el blog'));
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
                    <AddBlogForm blog={blogInfo} setBlog={setBlogInfo} utils={props.utils} files={contentFiles} setFiles={setContentFiles} blogFile={blogThumbnail} setBlogFile={setBlogThumbnail}  blogVideo={blogVideo} setBlogVideo={setBlogVideo}/>
                </div>

            </div>
            {errors && <ErrorsPanel errors={errors} close={() => setErrors(null)}/>}
        </LayoutAdmin>
    )
}

export const getServerSideProps =  async ctx => {
    const res = await fetch('http://localhost:3000/api/blog/findById/'+ctx.params.editId);
    const data = await res.json();
    const blog = data.Blog;
    return {props:{blog:blog}}
};

export default editBlog;

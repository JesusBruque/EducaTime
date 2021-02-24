import BlogItem from "./BlogItem";
import React, {FunctionComponent,useState} from "react";
import blogsModule from "../../styles/Blog.module.css";
import WebUtils from "../../webUtils/WebUtils";
import Blog from "../../utils/Blog";
import {Router} from "next/router";
import VideoComponent from "../VideoComponent";
type Props = {
    blogs:Blog[],
    admin:boolean,
    router:Router,
    utils?:WebUtils
}
const BlogGrid: FunctionComponent<Props> =  (props) => {
    const {blogs,admin,router,utils} = props;
    const [videoPlaying,setVideoPlaying] = useState(null);
    return (
        <React.Fragment>
            {blogs.length === 0 && <h3>¡Aún no tenemos entradas disponibles!</h3>}
            <div className={blogsModule.blogsContainer}>
                {blogs.map(blog=>{return <BlogItem blog={blog} key={blog._id} admin={admin} router={router} utils={utils} setVideoPlaying={setVideoPlaying}/>})}
            </div>
            {videoPlaying && <VideoComponent src={videoPlaying.video} onClose={() => setVideoPlaying(null)} title={videoPlaying.title} hls={true}/>}
        </React.Fragment>
    )
};

export default BlogGrid;

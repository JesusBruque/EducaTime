import BlogItem from "./BlogItem";
import React, {FunctionComponent} from "react";
import blogsModule from "../../styles/Blog.module.css";
import WebUtils from "../../webUtils/WebUtils";
import Blog from "../../utils/Blog";
import {Router} from "next/router";
type Props = {
    blogs:Blog[],
    admin:boolean,
    router:Router,
    utils?:WebUtils
}
const BlogGrid: FunctionComponent<Props> =  (props) => {
    const {blogs,admin,router,utils} = props;
    return (
        <React.Fragment>
            {blogs.length === 0 && <h3>¡Aún no tenemos entradas disponibles!</h3>}
            <div className={blogsModule.blogsContainer}>
                {blogs.map(blog=>{return <BlogItem blog={blog} key={blog._id} admin={admin} router={router} utils={utils}/>})}
            </div>
        </React.Fragment>
    )
};

export default BlogGrid;

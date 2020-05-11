import BlogItem from "./BlogItem";
import React from "react";
import blogsModule from "../../styles/Blog.module.css";

const BlogGrid =  ({blogs,admin,router}) => {
    return (
        <React.Fragment>
            {blogs.length === 0 && <h3>¡Aún no tenemos entradas disponibles!</h3>}
            <div className={blogsModule.blogsContainer}>
                {blogs.map(blog=>{return <BlogItem blog={blog} key={blog._id} admin={admin} router={router}/>})}
            </div>
        </React.Fragment>
    )
};

export default BlogGrid;

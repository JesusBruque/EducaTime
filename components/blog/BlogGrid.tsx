import BlogItem from "./BlogItem";
import React from "react";
import blogsModule from "../../styles/Blog.module.css";


const BlogGrid =  ({blogs,admin}) => {
    return (
        <div className={blogsModule.blogsContainer}>
            {blogs.map(blog=>{return <BlogItem blog={blog} key={blog._id} admin/>})}
        </div>)
};

export default BlogGrid;

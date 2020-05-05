import BlogItem from "./BlogItem";
import React from "react";
import blogsModule from "../../styles/Blog.module.css";
import Link from "next/link";

const BlogGrid =  ({blogs,admin,router}) => {
    return (
        <div className={blogsModule.blogsContainer}>
            {blogs.map(blog=>{return<BlogItem blog={blog} key={blog._id} admin={admin} router={router}/>})}
        </div>)
};

export default BlogGrid;

import BlogItem from '../components/BlogItem'
import Layout from '../components/Layout'
import blogsModule from '../styles/Blog.module.css'
import utilsStyles from '../styles/Utils.module.css';

import fetch from 'isomorphic-unfetch'
import React,{useEffect} from 'react';
import BlogUtilities from "../webUtils/BlogUtilities";
import BlogGrid from "../components/BlogGrid";

const Blogs=( {blogs} )=>{
    useEffect(() => {
        let bu = new BlogUtilities('main');
        bu.initBlogscroll().then(() => {
            bu.enterAnimations();
        }).catch(err => console.error(err));
    },[]);
    return (
        <Layout>
            <div className={utilsStyles.sectionContainer}>
                <h1 className={`${blogsModule.title} ${utilsStyles.sectionTitle}`}>Blog</h1>
                <div className={utilsStyles.centeredContainer}>
                    <BlogGrid blogs={blogs} admin={false}/>
                </div>
            </div>
        </Layout>
    
    )
};

export async function getStaticProps(){
    const res = await fetch('http://localhost:5000/api/blog/findAll');
    const data = await res.json();
    const blogs = data.Blog;
    return { props: { blogs } }
}

export default Blogs;

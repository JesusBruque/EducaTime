import Layout from '../../components/Layout'
import blogsModule from '../../styles/Blog.module.css'
import utilsStyles from '../../styles/Utils.module.css';
import fetch from 'isomorphic-unfetch'
import React from 'react';
import BlogGrid from "../../components/blog/BlogGrid";
import Head from "next/head";


const Blogs=(props )=>{
    return (
        <Layout user={props.user} router={props.router} setUser={props.setUser} utils={props.utils}>
            <Head>
                <title>Casor - Blog</title>
                <meta name={'description'} content={'Casor. Artículos sobre fromación deportiva.'}/>
                <link rel="icon" href="/assets/logo.svg"/>
            </Head>
            <div className={utilsStyles.sectionContainer}>
                <h1 className={`${blogsModule.title} ${utilsStyles.sectionTitle}`}>Blog</h1>
                <div className={utilsStyles.centeredContainer}>
                    <BlogGrid blogs={props.blogs} admin={false} router={props.router}/>
                </div>
            </div>
        </Layout>

    )
};

export async function getServerSideProps(){
    const res = await fetch('http://localhost:3000/api/blog/findAll');
    const data = await res.json();
    const blogs = data.Blog;
    return { props: { blogs } }
}

export default Blogs;

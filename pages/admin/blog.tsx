import fetch from "isomorphic-unfetch";
import utilsStyles from "../../styles/Utils.module.css";
import blogsModule from "../../styles/Blog.module.css";
import BlogGrid from "../../components/BlogGrid";
import Layout from "../../components/Layout";
import React, {useEffect} from "react";
import WebUtils from "../../webUtils/WebUtils";

const Blog = ({blogs}) => {
    useEffect(() => {
        let wu = new WebUtils('#admin-main--container');
        wu.initScroll().then(() => {}).catch(err => console.error(err));
    },[]);

    return (
        <Layout admin selected={'blog'}>
            <div className={utilsStyles.sectionContainer}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <h1 className={`${blogsModule.title} ${utilsStyles.sectionTitle}`}>Blog</h1>
                    <button className={`${utilsStyles.btn} ${utilsStyles.btnWhite} ${utilsStyles.btnRounded}`}>
                        <img src={'/assets/icons/add.svg'}/>
                        <span>Añadir entrada</span>
                    </button>
                    <div className={utilsStyles.inputContainer}>
                        <img src={'/assets/icons/search.svg'} alt={'icono de lupa'}/>
                        <input className={utilsStyles.input} placeholder={'Buscar...'}/>
                    </div>
                </div>
                <div className={utilsStyles.centeredContainer}>
                    <BlogGrid blogs={blogs} admin={true}/>
                </div>
            </div>
        </Layout>
    )
};


export async function getServerSideProps(){
    const res = await fetch('http://localhost:5000/api/blog/findAll');
    const data = await res.json();
    const blogs = data.Blog;
    return { props: { blogs } }
}


export default Blog;

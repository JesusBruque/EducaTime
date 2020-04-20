import Blog from '../components/Blog'
import Layout from '../components/Layout'
import blogsModule from '../styles/Blogs.module.css'
import {useEffect} from 'react';
import gsap from "gsap";

const Blogs=({blogs})=>{

    useEffect(() => {
        gsap.to('#cortina-entrada img',{opacity:0,duration:.4});
        gsap.to('#cortina-entrada',{duration:1.5,transformOrigin:'bottom',scaleY:0,ease:'power2.inOut'});
    },[]);
    return (
    <div>
        <Layout>
            <p className={blogsModule.titulo}>Blogs</p>
            <div className={blogsModule.panel}>
                {blogs.map(blog=>{return <Blog blog= {blog}/>})}
            </div>
        </Layout>
    </div>
    
    )
};

export async function getServerSideProps(){
    const res = await fetch('http://localhost:5000/api/blog/findAll');
    const data = await res.json();
    const blogs = data.Blog;
    return { props: { blogs } }
}

export default Blogs;

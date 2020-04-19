import Blog from '../components/Blog'
import Layout from '../components/Layout'
import blogsModule from '../styles/Blogs.module.css'

const Blogs=({blogs})=>{
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
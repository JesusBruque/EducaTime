import fetch from "isomorphic-unfetch";
import utilsStyles from "../../../styles/Utils.module.css";
import BlogGrid from "../../../components/blog/BlogGrid";
import React, {useEffect} from "react";
import Link from "next/link";
import LayoutAdmin from "../../../components/LayoutAdmin";
const Index = (props) => {

    return (
        <LayoutAdmin user={props.user} router={props.router} selected={'blog'}>
            <div className={utilsStyles.sectionContainer}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <h1 className={`${utilsStyles.sectionTitle}`}>Blog</h1>
                    <Link href={'/admin/blog/add'}>
                        <button className={`${utilsStyles.btn} ${utilsStyles.btnWhite} ${utilsStyles.btnRounded}`}>
                            <img src={'/assets/icons/add.svg'}/>
                            <span>Añadir entrada</span>
                        </button>
                    </Link>
                    <div className={utilsStyles.inputContainer}>
                        <img src={'/assets/icons/search.svg'} alt={'icono de lupa'}/>
                        <input className={utilsStyles.input} placeholder={'Buscar...'}/>
                    </div>
                </div>
                <div className={utilsStyles.centeredContainer}>
                    <BlogGrid blogs={props.blogs} admin={true}/>
                </div>
            </div>
        </LayoutAdmin>

    )
};


export async function getServerSideProps(){
    const res = await fetch('http://localhost:5000/api/blog/findAll');
    const data = await res.json();
    const blogs = data.Blog;
    return { props: { blogs } }
}


export default Index;

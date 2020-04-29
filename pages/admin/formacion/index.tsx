import Layout from "../../../components/Layout";
import CursoGrid from "../../../components/CursosGrid";
import fetch from "isomorphic-unfetch";
import React, {useEffect} from "react";
import WebUtils from "../../../webUtils/WebUtils";
import utilsStyles from "../../../styles/Utils.module.css";
import Button from '../../../components/Button';
import Link from "next/link";
import LayoutAdmin from "../../../components/LayoutAdmin";

const Index = (props) => {

    return (
        <LayoutAdmin user={props.user} router={props.router} selected={'formacion'}>
            <div className={utilsStyles.sectionContainer}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <h1 className={utilsStyles.sectionTitle}>Formación</h1>
                    <Link href={'/admin/formacion/add'}>
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
                    <CursoGrid cursos={props.cursos}/>
                </div>
            </div>
        </LayoutAdmin>
    )
};

export async function getServerSideProps(){
    const res = await fetch('http://localhost:5000/api/course/findAll');
    const data = await res.json();
    const cursos = data.Course;
    return { props: { cursos }}
}

export default Index;

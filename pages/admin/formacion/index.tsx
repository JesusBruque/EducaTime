import CursoGrid from "../../../components/cursos/CursosGrid";
import fetch from "isomorphic-unfetch";
import React, { useEffect, useState } from "react";
import utilsStyles from "../../../styles/Utils.module.css";
import Link from "next/link";
import LayoutAdmin from "../../../components/LayoutAdmin";
import { findAll } from '../../../utils/Course'
import Axios from "axios";


const Index = (props) => {
    const [cursos, setCursos] = useState([])
    const [search, setSearch] = useState('')
    useEffect(() => {
        if (props.cursos) {
            setCursos(props.cursos);
        }
    }, [props.cursos])

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }
    const onSearch = () => {
        findAll(search).then(res => {
            setCursos(res.data.Course)
        })
    }

    return (
        <LayoutAdmin user={props.user} router={props.router} selected={'formacion'} utils={props.utils} setUser={props.setUser}>
            <div className={utilsStyles.sectionContainer}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 className={utilsStyles.sectionTitle}>Formación</h1>
                    <Link href={'/admin/formacion/add'}>
                        <button className={`${utilsStyles.btn} ${utilsStyles.btnWhite} ${utilsStyles.btnRounded}`}>
                            <img src={'/assets/icons/add.svg'} />
                            <span>Añadir curso</span>
                        </button>
                    </Link>
                    <div className={utilsStyles.inputContainer}>
                        <img style={{ cursor: 'pointer' }} onClick={onSearch} src={'/assets/icons/search.svg'} alt={'icono de lupa'} />
                        <input onChange={handleSearch} className={utilsStyles.input} placeholder={'Buscar...'} />
                    </div>
                </div>
                <div className={utilsStyles.centeredContainer}>
                    {cursos.length > 0 ? <CursoGrid utils={props.utils} cursos={cursos} router={props.router} admin={true} /> : <h3 style={{ color: 'var(--black-color)' }}>{search ? 'No se ha encontrado ningún curso de formación.' : 'Aún no se ha añadido ningún curso de formación.'}</h3>}
                </div>
            </div>
        </LayoutAdmin>
    )
};

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/api/course/findAll');
    const data = await res.json();
    const cursos = data.Course;
    return { props: { cursos } }
}

export default Index;

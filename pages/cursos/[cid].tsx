import {getCourseById} from "../../utils/Curso";
import CursoItem from "../../components/cursos/CursoItem"
import Course from "../../utils/Course";
import React, {Dispatch, FunctionComponent, useEffect, useState} from "react";
import {Router} from "next/router";
import Layout from "../../components/Layout";
import {User} from "../../utils/Authentication";
import VideoComponent from "../../components/VideoComponent";
import Head from "next/head";

type Props = {
    curso:Course,
    router:Router,
    user:User
    setUser:Dispatch<any>
}
const Curso : FunctionComponent<Props> = (props) => {

    useEffect(() => {console.log(props.curso)},[]);
    const [cursoPlaying,setCursoPlaying] = useState(null);
    return (
        <React.Fragment>
            <Head>
                <title>Casor - {props.curso.title}</title>
                <meta name={'description'} content={props.curso.description} key={'description'}/>
                <link rel={'icon'} href={'/assets/logo.svg'}/>
            </Head>
            <Layout router={props.router} user={props.user} setUser={props.setUser}>
                <CursoItem curso={props.curso} router={props.router} setCursoPlaying={setCursoPlaying} admin={false} reviews={true} fees={true}/>
                {cursoPlaying && <VideoComponent src={cursoPlaying.video} onClose={() => setCursoPlaying(null)} title={cursoPlaying.title}/>}
            </Layout>
        </React.Fragment>
    )
};

export const getServerSideProps =  async ctx => {
    const res = await getCourseById(ctx.params.cid);
    const curso = res.data.Course;
    return {props:{curso:curso}}
};
export default Curso;

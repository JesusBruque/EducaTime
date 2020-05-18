import Blog from "../../utils/Blog";
import React,{Dispatch, FunctionComponent} from "react";
import Layout from "../../components/Layout";
import {Router} from "next/router";
import {User} from "../../utils/Authentication";
import BlogDetalle from "../../components/blog/BlogDetalle";
import {getBlogById} from "../../utils/Blog";
import WebUtils from "../../webUtils/WebUtils";
import Head from "next/dist/next-server/lib/head";

type Props = {
    blog:Blog,
    router:Router,
    user:User,
    setUser:Dispatch<any>,
    utils:WebUtils
}

const BlogDetail :FunctionComponent<Props> = (props) => {
    return (
        <Layout router={props.router} user={props.user} setUser={props.setUser} utils={props.utils}>
            <Head>
                <title>Casor - {props.blog.title}</title>
                <meta name={'description'} content={props.blog.description} key={'description'}/>
                <link rel={'icon'} href={'/assets/logo.svg'}/>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/assets/logo.svg"/>
                <meta property="og:title" content={props.blog.title}/>
                <meta property="og:description" content={'Casor. Entrada de blog - '+props.blog.title}/>
                <meta property="og:image" content={props.blog.thumbnail}/>
                <meta property="og:url" content={window.location.href} />
            </Head>
            <BlogDetalle blog={props.blog} admin={false}/>
        </Layout>
    )
};
export const getServerSideProps =  async ctx => {
    const res = await fetch('http://localhost:3000/api/blog/findById/'+ctx.params.bid);
    const data = await res.json();
    const blog = data.Blog;
    return {props:{blog:blog}}
};

export default BlogDetail;

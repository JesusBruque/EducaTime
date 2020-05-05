import Blog from "../../utils/Blog";
import React,{Dispatch, FunctionComponent} from "react";
import Layout from "../../components/Layout";
import {Router} from "next/router";
import {User} from "../../utils/Authentication";
import BlogDetalle from "../../components/blog/BlogDetalle";
import {getBlogById} from "../../utils/Blog";

type Props = {
    blog:Blog,
    router:Router,
    user:User,
    setUser:Dispatch<any>
}

const BlogDetail :FunctionComponent<Props> = (props) => {
    return (
        <Layout router={props.router} user={props.user} setUser={props.setUser}>
            <BlogDetalle blog={props.blog} admin={false}/>
        </Layout>
    )
};
export const getServerSideProps =  async ctx => {
    const res = await getBlogById(ctx.params.bid);
    const blog = res.data.Blog;
    return {props:{blog:blog}}
};

export default BlogDetail;

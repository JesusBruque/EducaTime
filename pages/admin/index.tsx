import Layout from "../../components/Layout";
import Router from "next/router";
import {useEffect} from "react";
const Index = () => {
    useEffect(() => {
        Router.push('/admin/formacion');
    },[]);
    return (
        <Layout admin>

        </Layout>
    )
};

export default Index;

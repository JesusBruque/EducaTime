import Layout from "../../../components/Layout";
import utilsStyles from "../../../styles/Utils.module.css";
import React from "react";
import blogsModule from "../../../styles/Blog.module.css";

const AddBlog = () => {
    return (
        <Layout admin>
            <div className={utilsStyles.sectionContainer}>
                <h1 className={`${blogsModule.title} ${utilsStyles.sectionTitle}`}>Añadir Entrada</h1>
            </div>
        </Layout>
    )
}

export default AddBlog;

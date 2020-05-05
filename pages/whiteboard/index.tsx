import Layout from "../../components/Layout";

const userWhiteBoard = (props) => {
    return (
        <Layout user={props.user} setUser={props.setUser} router={props.router}>
            WHITE BOARD USER
        </Layout>
    )
};

export default userWhiteBoard;

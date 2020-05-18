import Layout from "../components/Layout";

const Nosotros =(props) => {
    return (
        <Layout router={props.router} user={props.user} setUser={props.setUserr} utils={props.utils}>
            <p>Pantalla de nosotros</p>
        </Layout>
    )
};

export default Nosotros;

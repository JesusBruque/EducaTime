import Layout from "../components/Layout";

const Contacto = (props) => {
    return (
        <Layout router={props.router} user={props.user} setUser={props.setUser} utils={props.utils}>
            <p>Pantalla de contacto</p>
        </Layout>
    )
};

export default Contacto;

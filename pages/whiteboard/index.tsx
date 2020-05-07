import Layout from "../../components/Layout";
import {logout} from "../../utils/Authentication";

const userWhiteBoard = (props) => {

    const goLogOut = () => {
        logout().then(() => {
            props.router.push('/login');
            props.setUser(null);
        });
    }
    return (
        <Layout user={props.user} setUser={props.setUser} router={props.router} utils={props.utils}>
            WHITE BOARD USER
            <button onClick={goLogOut}>Salir</button>
        </Layout>
    )
};

export default userWhiteBoard;

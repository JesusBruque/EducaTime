
import LayoutAdmin from "../../components/LayoutAdmin";

const Compras = (props) => {
    return (
        <LayoutAdmin selected={'compras'} router={props.router} utils={props.utils} user={props.user} setUser={props.setUser}>
            PAGINA DE COMPRAS
        </LayoutAdmin>
    )
}
export default Compras;

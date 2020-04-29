import AdminNavbar from "./admin/AdminNavbar";
import React, {useEffect} from "react";
import layoutStyles from '../styles/Layout.module.css';

const LayoutAdmin = (props) => {

    return (
        <React.Fragment>
            {
                props.user && props.user.rol === 'admin' ?
                    <React.Fragment>
                        <main className={layoutStyles.adminContainer}>
                            {props.children}
                        </main>
                        <AdminNavbar selected={props.selected}/>
                    </React.Fragment>
                : null
            }

        </React.Fragment>
    )

};
export default LayoutAdmin;

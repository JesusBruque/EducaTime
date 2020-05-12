import AdminNavbar from "./admin/AdminNavbar";
import React, {Dispatch, useEffect,FunctionComponent} from "react";
import layoutStyles from 'styles/Layout.module.css';
import {Router} from "next/router";
import {User} from "../utils/Authentication";
import WebUtils from "../webUtils/WebUtils";

type Props = {
    router:Router,
    user:User,
    setUser:Dispatch<any>,
    utils:WebUtils,
    selected:string
}
const LayoutAdmin:FunctionComponent<Props> = (props) => {

    useEffect(() => {
        console.log('eliminando scroll');
        props.utils.removeScroll();
    },[]);
    return (
        <React.Fragment>
            {
                props.user && props.user.roles.includes('admin') ?
                    <React.Fragment>
                        <main className={layoutStyles.adminContainer}>
                            {props.children}
                        </main>
                        <AdminNavbar selected={props.selected} router={props.router} setUser={props.setUser}/>
                    </React.Fragment>
                : null
            }

        </React.Fragment>
    )

};
export default LayoutAdmin;

import React from 'react';
import Header from "./Header";
import Menu from "./Menu";

const Layout = props => {

    return (
        <div>
            <Header />
            <main>
                {props.children}
            </main>
            <Menu />
        </div>
    )
}

export default Layout;

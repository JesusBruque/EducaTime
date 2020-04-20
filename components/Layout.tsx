import React from 'react';
import Header from "./Header";
import Menu from "./Menu";
import Entrada from "./Entrada";
const Layout = props => (
    <div>
        <Entrada />
        <Header />
        <main>
            {props.children}
        </main>
        <Menu />
    </div>
);

export default Layout;

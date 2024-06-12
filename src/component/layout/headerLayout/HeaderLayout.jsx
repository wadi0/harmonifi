import React from 'react';
import Header from "../../header/Header.jsx";
import {Outlet} from "react-router-dom";

const HeaderLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};

export default HeaderLayout;
import React from 'react';
import Header from "../../header/Header.jsx";
import {Outlet} from "react-router-dom";

const HeaderLayout = ({toggleSidebar}) => {
    return (
        <div>
            <Header toggleSidebar={toggleSidebar}/>
            <Outlet/>
        </div>
    );
};

export default HeaderLayout;
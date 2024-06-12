import React from 'react';
import SideMenu from "../../SideMenu/SideMenu.jsx";
import {Outlet} from "react-router-dom";
import "./sideMenuLayout.scss"

const SideMenuLayout = () => {
    return (
        <div className="sideMenuLayout-container">
            <SideMenu />
            <Outlet />
        </div>
    );
};

export default SideMenuLayout;
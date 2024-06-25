import React from 'react';
import SideMenu from "../../SideMenu/SideMenu.jsx";
import {Outlet} from "react-router-dom";
import "./sideMenuLayout.scss"

const SideMenuLayout = ({isOpen}) => {
    return (
        <div className="sideMenuLayout-container">
            <div className={`sideMenuCom ${isOpen ? 'open' : ''}`}>
                <SideMenu/>
            </div>
            <Outlet/>
        </div>
    );
};

export default SideMenuLayout;
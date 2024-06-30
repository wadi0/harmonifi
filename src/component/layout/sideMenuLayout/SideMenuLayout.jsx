import React from 'react';
import SideMenu from "../../SideMenu/SideMenu.jsx";
import {Outlet} from "react-router-dom";
import "./sideMenuLayout.scss"

const SideMenuLayout = ({isOpen, onUploadVideoClick, onAddModuleClick}) => {
    return (
        <div className="sideMenuLayout-container">
            <div className={`sideMenuCom ${isOpen ? 'open' : ''}`}>
                <SideMenu onUploadVideoClick={onUploadVideoClick} onAddModuleClick={onAddModuleClick} />
            </div>
            <Outlet/>
        </div>
    );
};

export default SideMenuLayout;
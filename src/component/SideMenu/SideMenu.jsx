import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse, faSquarePlus, faVideo} from "@fortawesome/free-solid-svg-icons";
import "./sideMenu.scss"
import {Link} from "react-router-dom";
import path from "../../routes/path.js";

const SideMenu = ({ onUploadVideoClick, onAddModuleClick }) => {

    return (
        <div className="sideMenu-container">
            <ul className="sideMenu-list">
                <li>
                    <FontAwesomeIcon icon={faHouse}/><span className="ms-3 nunito-600">Home</span>
                </li>
                <li>
                    <Link to={path.home2} ><FontAwesomeIcon icon={faHouse}/><span className="ms-3 nunito-600">Home</span></Link>
                </li>
            </ul>
            <div className="bottom-menu">
                <ul className="bottom-menu-list">
                    <li className="home">
                        <FontAwesomeIcon icon={faHouse} className="w-100"/><span className="w-100 nunito-600">Home</span>
                    </li>
                    <li className="video-module" onClick={onUploadVideoClick}>
                        <FontAwesomeIcon icon={faVideo} className="w-100"/><span className="w-100 nunito-600">Upload Video</span>
                    </li>
                    <li className="video-module" onClick={onAddModuleClick}>
                        <FontAwesomeIcon icon={faSquarePlus} className="w-100"/><span className="w-100 nunito-600">Add Module</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideMenu;
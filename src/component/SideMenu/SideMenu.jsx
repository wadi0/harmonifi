import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse, faSquarePlus, faVideo} from "@fortawesome/free-solid-svg-icons";
import "./sideMenu.scss"

const SideMenu = ({ onUploadVideoClick, onAddModuleClick }) => {

    return (
        <div className="sideMenu-container">
            <ul className="sideMenu-list">
                <li>
                    <FontAwesomeIcon icon={faHouse} /><span className="ms-3 roboto-regular">Home</span>
                </li>
            </ul>
            <div className="bottom-menu">
                <ul className="bottom-menu-list">
                    <li className="home">
                        <FontAwesomeIcon icon={faHouse} className="w-100"/><span className="w-100 roboto-regular">Home</span>
                    </li>
                    <li className="video-module" onClick={onUploadVideoClick}>
                        <FontAwesomeIcon icon={faVideo} className="w-100"/><span className="w-100 roboto-regular">Upload Video</span>
                    </li>
                    <li className="video-module" onClick={onAddModuleClick}>
                        <FontAwesomeIcon icon={faSquarePlus} className="w-100"/><span className="w-100 roboto-regular">Add Module</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideMenu;
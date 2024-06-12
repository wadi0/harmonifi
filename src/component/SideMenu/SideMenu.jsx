import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse} from "@fortawesome/free-solid-svg-icons";
import "./sideMenu.scss"

const SideMenu = () => {
    return (
        <div className="sideMenu-container">
            <ul className="sideMenu-list">
                <li>
                    <FontAwesomeIcon icon={faHouse} /><span className="ms-3">Home</span>
                </li>
            </ul>
        </div>
    );
};

export default SideMenu;
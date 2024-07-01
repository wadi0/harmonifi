import React from 'react';
import "./header.scss";
import siteConfig from "../../config/site-config.js";
import {Link, useNavigate} from "react-router-dom";
import path from "../../routes/path.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faBars} from "@fortawesome/free-solid-svg-icons";

const Header = ({toggleSidebar}) => {
    const navigate = useNavigate();

    const logout = () => {
        navigate(path.login);
    };

    return (
        <header className="header-container">
            <div className="header-logo">
                <Link href={path.home}>
                    <img src={siteConfig.company_logo} alt="company_logo"/>
                </Link>
            </div>
            <button className="logout-btn" onClick={logout}>
                <span className="me-2">Log out</span>
                <FontAwesomeIcon icon={faArrowRightFromBracket}/>
            </button>
        </header>
    );
};

export default Header;

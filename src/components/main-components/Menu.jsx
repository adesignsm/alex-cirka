import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import "../../styles/menu/menu.css";

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="navbar" role="navigation" aria-label="navigation">
                <div id="main-menu-desktop">
                    <div className="mobile-nav-bar"> {/*MOBILE MENU*/}
                        <a role="button" className={`navbar-burger burger ${isOpen && "is-active"}`} aria-label="menu" aria-expanded="false"onClick={() => setIsOpen(!isOpen)}>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div className={`navbar-menu ${isOpen && "is-active"}`}>
                        <div id = "menu-container-desktop" className="navbar-start">
                            <NavLink className="navbar-item" activeclassname="is-active" to="/about"> About </NavLink>
                            <NavLink className="navbar-item" activeclassname="is-active" to="/"> Home </NavLink>
                            <NavLink className="navbar-item" activeclassname="is-active" to="/archive"> Archive </NavLink>
                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Menu;
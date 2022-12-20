import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import sanityClient from "../../client";
import imageUrlBuilder from "@sanity/image-url";

import "../../styles/menu/menu.css";

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [headerLogoData, setHeaderLogoData] = useState([]);
    const [headerLogo, setHeaderLogo] = useState([]);

    const builder = imageUrlBuilder(sanityClient);
    const urlFor = (source) => {
        return builder.image(source).auto('format').width(200).url();  
    }

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "header_logo"]{
                header_logo_upload,
                header_text,
              }`
        ).then((data) => {
            setHeaderLogoData(data[0]);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const handleHeaderLogoData = () => {
        if (Object.keys(headerLogoData).length === 1) {
            if (Object.keys(headerLogoData)[0] === "header_logo_upload") {
                setHeaderLogo(<img src ={urlFor(headerLogoData.header_logo_upload.asset._ref)} />);
            } else if (Object.keys(headerLogoData)[0] === "header_text") {
                setHeaderLogo(headerLogoData.header_text);
            } else {
                alert("there is an error in your header CMS section. Please check for errors, and come back to this page.");
            }
        }
    }

    setTimeout(() => {
        handleHeaderLogoData();
    }, 100);
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
                            <NavLink className="navbar-item" activeclassname="is-active" to="/"> {headerLogo} </NavLink>
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
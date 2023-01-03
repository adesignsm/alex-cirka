import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import sanityClient from "../../client";
import imageUrlBuilder from "@sanity/image-url";

import {Style} from "react-style-tag";

import "../../styles/menu/menu.css";

const Menu = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [fontData, setFontData] = useState([]);
    const [navFont, setNavFont] = useState([]);
    const [headerLogoData, setHeaderLogoData] = useState([]);
    const [headerLogo, setHeaderLogo] = useState([]);

    const builder = imageUrlBuilder(sanityClient);
    const urlFor = (source) => {
        return builder.image(source).auto('format').width(200).url();  
    }

    const editUrlString = (urlString) => {
        let strUrl = urlString.replace(/file-/g, "");
        strUrl = strUrl.replace("-", ".");

        return `https://cdn.sanity.io/files/ot5ilm3g/production/${strUrl}`;
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

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "font"]{
                font_name,
                font_file_upload,
            }`
        ).then((data) => {
            setFontData(data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    const sortFontData = (data) => {
        data.forEach((font) => {
            if (font.font_name === "Header Bar - menu item font") {
                setNavFont(editUrlString(font.font_file_upload.asset._ref));
            }
        })
    }

    useEffect(() => {
        sortFontData(fontData);
    });

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
                        <Style>
                            {`
                                @font-face {
                                    font-family: "Navigation Font";
                                    src: url(${navFont});
                                }
                                `
                            }
                        </Style>
                        <div id = "menu-container-desktop" className="navbar-start">
                            <NavLink className="navbar-item" activeclassname="is-active" to="/about" style={{fontFamily: "Navigation Font"}}> About </NavLink>
                            <NavLink className="navbar-item" activeclassname="is-active" to="/" style={{fontFamily: "Navigation Font"}}> {headerLogo} </NavLink>
                            <NavLink className="navbar-item" activeclassname="is-active" to="/archive" style={{fontFamily: "Navigation Font"}}> Archive </NavLink>
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
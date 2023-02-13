import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import {Style} from "react-style-tag";

const Colors = () => {
    /*backgrounds*/
    const [navBg, setNavBg] = useState("");
    const [bodyBg, setBodyBg] = useState("");
    const [aboutBg, setAboutBg] = useState("");
    const [aboutDescriptionBg, setAboutDescriptionBg] = useState("");
    const [archiveBg, setArchiveBg] = useState("");
    const [footerBg, setFooterBg] = useState("");

    /*fonts*/
    const [projectTitleColor, setProjectTitleColor] = useState("");
    const [projectBodyColor, setProjectBodyColor] = useState("");
    const [navFontColor, setNavFontColor] = useState("");
    const [footerFontColor, setFooterFontColor] = useState("");
    const [aboutFontColor, setAboutFontColor] = useState("");

    const [hoverColor, setHoverColor] = useState("");

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "colors"]{
                color_code_element_name,
                color_code
              }`
        ).then((data) => {
            data.forEach((obj) => {
                if (obj.color_code_element_name === "Project Title Font") {
                    setProjectTitleColor(obj.color_code);
                } else if (obj.color_code_element_name === "Navigation Bar Background") {
                    setNavBg(obj.color_code);
                } else if (obj.color_code_element_name === "Font Hover") {
                    setHoverColor(obj.color_code);
                } else if (obj.color_code_element_name === "Navigation Bar Font") {
                    setNavFontColor(obj.color_code);
                } else if (obj.color_code_element_name === "Footer Font") {
                    setFooterFontColor(obj.color_code);
                } else if (obj.color_code_element_name === "About Background") {
                    setAboutBg(obj.color_code);
                } else if (obj.color_code_element_name === "Project Body Font") {
                    setProjectBodyColor(obj.color_code);
                } else if (obj.color_code_element_name === "About Description Font") {
                    setAboutFontColor(obj.color_code);
                } else if (obj.color_code_element_name === "Archive Background") {
                    setArchiveBg(obj.color_code);
                } else if (obj.color_code_element_name === "About Description Background") {
                    setAboutDescriptionBg(obj.color_code);
                } else if (obj.color_code_element_name === "Footer") {
                    setFooterBg(obj.color_code);
                } else if (obj.color_code_element_name === "Home Background") {
                    setBodyBg(obj.color_code);
                }
            })  
        }).catch(console.error);
    }, []);

    return (
        <>
            <Style>
            {`
                body, html {
                    padding: 0;
                    margin: 0;
                    background-color: ${bodyBg};
                }

                /*nav styles*/
                .navbar {
                    background-color: ${navBg};
                }

                /*about styles*/
                #about-container {
                    background-color: ${aboutBg};
                }
                #about-container #about-description h1 {
                    color: ${aboutFontColor};
                }
                #about-container .about-clients {
                    color: ${aboutFontColor};
                }

                /*archive styles*/
                #indexed-projects-container {
                    background-color: ${archiveBg};
                }

                /*project styles*/
                .project-container h1 {
                    color: ${projectTitleColor};
                }
                .project-container h4 {
                    color: ${projectBodyColor};
                }

                /*footer styles*/
                #footer-container {
                    background-color: ${footerBg};
                }
                #footer-container h4 {
                    color: ${footerFontColor}
                }

                /*hover states*/
                .navbar .navbar-item:hover {
                    color: ${hoverColor} !important;
                }
            `}
            </Style>
        </>
    )
}

export default Colors;
import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";

import sanityClient from "../../client";
import imageUrlBuilder from "@sanity/image-url";
import {v4 as v4uuid} from "uuid";

import {Style} from "react-style-tag";

import "../../styles/projects/projects.css";

const Projects = () => {
    const [projectData, setProjectData] = useState([]);
    const [fontData, setFontData] = useState([]);
    const [headingFontData, setHeadingFontData] = useState([]);
    const [bodyFontData, setBodyFontData] = useState([]);

    const builder = imageUrlBuilder(sanityClient);
    const urlFor = (source, width) => {
        return builder.image(source).auto('format').width(width).url();  
    }

    const editUrlString = (urlString) => {
        let strUrl = urlString.replace(/file-/g, "");
        strUrl = strUrl.replace("-", ".");

        return `https://cdn.sanity.io/files/ot5ilm3g/production/${strUrl}`;
    }

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "projects"]{
                project_title,
                project_media,
                project_description
              }`
        ).then((data) => {
            setProjectData(data);
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
        }).catch(console.error);
    }, []);

    const sortFontData = (data) => {
        data.forEach((font) => {
            if (font.font_name === "Home Page - project body text") {
                setBodyFontData(editUrlString(font.font_file_upload.asset._ref));
            } else if (font.font_name === "Home Page - project heading text") {
                setHeadingFontData(editUrlString(font.font_file_upload.asset._ref));
            }
        })
    }
    
    useEffect(() => {
        sortFontData(fontData);
    });

    return (
       <React.Fragment key={v4uuid}>
        {projectData.map((project, i) => {
            return (
                <div className="project-container">
                    <div className = "project-media-container">
                        {project.project_media.map((image) => {
                            let link = `/projects/${project.project_title}`;
                            let projectLink = link.replace(" ", "-");

                            return (
                                <NavLink className="navbar-item" activeclassname="is-active" to={projectLink}> 
                                    <img src={urlFor(image.asset._ref, Math.floor(image.image_width * 10))} />
                                </NavLink>
                            )
                        })}
                    </div>
                    <Style>
                        {`
                            @font-face {
                                font-family: "Project Heading Font";
                                src: url(${headingFontData});
                            }

                            @font-face {
                                font-family: "Project Body Font";
                                src: url(${bodyFontData});
                            }
                            `
                        }
                    </Style>
                    <h1 style={{fontFamily: "Project Heading Font"}}> {project.project_title} </h1>
                    <h4 style={{fontFamily: "Project Body Font"}}> {project.project_description} </h4>
                </div>
            )
        })}
       </React.Fragment>
    )
}

export default Projects;
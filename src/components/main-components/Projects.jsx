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
                video_embed,
                video_file,
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
        <span className="project-title"> TEST </span>
        {projectData.map((project, i) => {
            return (
                <div className="project-container">
                    <div className = "project-media-container">
                        {project.project_media.map((media) => {
                            if (media._type === "image_upload") {
                                let link = `/projects/${project.project_title}`;
                                let projectLink = link.replace(" ", "-");
                                return (
                                    <NavLink className="navbar-item" activeclassname="is-active" to={projectLink}> 
                                        <img className="project-item" data-project-title={project.project_title} src={urlFor(media.asset._ref, Math.floor(media.image_width * 10))} />
                                    </NavLink>
                                )
                            } else if (media._type === "video_file") {
                                let link = `/projects/${project.project_title}`;
                                let projectLink = link.replace(" ", "-");

                                return (
                                    <NavLink className="navbar-item" activeclassname="is-active" to={projectLink}>
                                        <video className="project-item" data-project-title={project.project_title} autoPlay loop muted width={media.video_width * 10}><source src={editUrlString(media.asset._ref)} type="video/mp4"/></video>
                                    </NavLink>
                                )
                            } else if (media._type === "video_embed") {
                                let link = `/projects/${project.project_title}`;
                                let projectLink = link.replace(" ", "-");

                                return (
                                    <NavLink className="navbar-item" activeclassname="is-active" to={projectLink}>
                                        <iframe 
                                            src={media.video_embed} 
                                            width={media.video_width * 10} 
                                            height={media.video_width * 5} 
                                            allowFullScreen 
                                            autoPlay
                                            frameBorder="0"
                                            className="project-item"
                                            data-project-title={project.project_title}
                                        ></iframe>
                                    </NavLink>
                                )
                            }
                        })}
                                                    <div className="project-info">
                                <h1 style={{fontFamily: "Project Heading Font"}}> {project.project_title} </h1>
                                <h4 style={{fontFamily: "Project Body Font"}}> {project.project_description} </h4>
                            </div>
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
                </div>
            )
        })}
       </React.Fragment>
    )
}

export default Projects;
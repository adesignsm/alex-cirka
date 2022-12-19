import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import sanityClient from "../../client";
import imageUrlBuilder from "@sanity/image-url";

import "../../styles/archive/archive.css";

const Archive = () => {
    const [projectData, setProjectData] = useState([]);

    const builder = imageUrlBuilder(sanityClient);
    const urlFor = (source, width) => {
        return builder.image(source).auto('format').width(width).url();  
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
        }).catch(console.error);
    }, []);

    return (
        <>
            <div id = "indexed-projects-container">
                {Object.keys(projectData).map((project) => {
                    console.log(projectData[project].project_media[0].asset._ref);
                    let link = `/projects/${projectData[project].project_title}`;
                    let projectLink = link.replace(" ", "-");

                    console.log(projectLink);

                    return (
                        <div className="thumbnail">
                            <NavLink className="navbar-item" activeclassname="is-active" to={projectLink}> 
                                <img src={urlFor(projectData[project].project_media[0].asset._ref)} />
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Archive;
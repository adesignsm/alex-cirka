import React, {useEffect, useState} from "react";

import sanityClient from "../client";
import imageUrlBuilder from "@sanity/image-url";
import {v4 as v4uuid} from "uuid";

import "../styles/projects/projects.css";

const Projects = () => {
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

    // console.log(projectData);

    return (
       <React.Fragment key={v4uuid}>
        {projectData.map((project, i) => {
            return (
                <div className="project-container">
                    <div className = "project-media-container">
                        {project.project_media.map((image) => {
                            return (
                                <img src={urlFor(image.asset._ref, Math.floor(image.image_width * 10))} />
                            )
                        })}
                    </div>
                    <h1> {project.project_title} </h1>
                    <h4> {project.project_description} </h4>
                </div>
            )
        })}
       </React.Fragment>
    )
}

export default Projects;
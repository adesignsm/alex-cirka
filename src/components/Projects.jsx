import React, {useEffect, useState} from "react";

import sanityClient from "../client";
import imageUrlBuilder from "@sanity/image-url";

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
       <>
        {projectData.map((project, i) => {
            return (
                <div className="project-container">
                    <div className = "project-media-container">
                        {project.project_media.map((image) => {
                            // console.log(image);
                            return (
                                <img src={urlFor(image.asset._ref, image.image_width * 10)} />
                            )
                        })}
                    </div>
                    <h1 key={i}> {project.project_title} </h1>
                    <h4> {project.project_description} </h4>
                </div>
            )
        })}
       </>
    )
}

export default Projects;
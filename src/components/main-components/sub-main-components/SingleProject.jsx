import React, { useState, useEffect } from "react";
import sanityClient from "../../../client";
import imageUrlBuilder from "@sanity/image-url";

const SingleProject = () => {
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
            {projectData.length && 
                <div id = "single-project-container">
                    {Object.keys(projectData).map((project) => {
                        let rawProjectTitle = projectData[project].project_title
                        let projectTitle = rawProjectTitle.replace(" ", "-");
                        let windowUrl = window.location.href;

                        console.log(projectTitle);
                        
                        if (windowUrl.indexOf(projectTitle) !== -1) {
                            return (
                                <div className="project-container">
                                    <h1> {projectData[project].project_title}</h1>
                                    {projectData[project].project_media.map((i) => {
                                        return (
                                            <img src={urlFor(i.asset._ref)} />
                                        )
                                    })}
                                    <h3> {projectData[project].project_description} </h3>
                                </div>
                            )
                        }
                    })}
                </div>
            }
        </>
    )
}

export default SingleProject;
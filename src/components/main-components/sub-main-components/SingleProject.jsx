import React, { useState, useEffect } from "react";
import sanityClient from "../../../client";
import imageUrlBuilder from "@sanity/image-url";

import {Style} from "react-style-tag";

const SingleProject = () => {
    const [projectData, setProjectData] = useState([]);
    const [fontData, setFontData] = useState([]);
    const [headingFont, setHeadingFont] = useState([]);
    const [bodyFont, setBodyFont] = useState([]);

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
            if (font.font_name === "Home Page - project heading text") {
                setHeadingFont(editUrlString(font.font_file_upload.asset._ref));
            } else if (font.font_name === "Home Page - project body text") {
                setBodyFont(editUrlString(font.font_file_upload.asset._ref));
            }
        })
    }

    useEffect(() => {
        sortFontData(fontData);
    });

    return (
        <>
            {projectData.length && 
                <div id = "single-project-container">
                    {Object.keys(projectData).map((project) => {
                        let rawProjectTitle = projectData[project].project_title
                        let projectTitle = rawProjectTitle.replace(" ", "-");
                        let windowUrl = window.location.href;
                        
                        if (windowUrl.indexOf(projectTitle) !== -1) {
                            return (
                                <div className="project-container">
                                    <Style>
                                        {`
                                            @font-face {
                                                font-family: "Project Heading Font";
                                                src: url(${headingFont});
                                            }

                                            @font-face {
                                                font-family: "Project Body Font";
                                                src: url(${bodyFont});
                                            }
                                            `
                                        }
                                    </Style>
                                    <h1 style={{fontFamily: "Project Heading Font"}}> {projectData[project].project_title}</h1>
                                    {projectData[project].project_media.map((i) => {
                                        return (
                                            <img src={urlFor(i.asset._ref)} />
                                        )
                                    })}
                                    <h3 style={{fontFamily: "Project Body Font"}}> {projectData[project].project_description} </h3>
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
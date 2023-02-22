import React, { useEffect, useState } from "react";
import sanityClient from "../client";
import {Style} from "react-style-tag";

const Misc = () => {
    const [bodyMargin, setBodyMargin] = useState("");
    const [pageMargin, setPageMargin] = useState("");
    const [headingMargin, setHeadingMargin] = useState("");
    const [projectMargin, setProjectMargin] = useState("");
    const [mediaSize, setMediaSize] = useState("");

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "misc"]{
                project_margin,
                page_margin,
                heading_margin,
                body_margin,
                project_media_size
              }`
        ).then((data) => {
            data.forEach((obj) => {
                setBodyMargin(obj.body_margin);
                setPageMargin(obj.page_margin);
                setHeadingMargin(obj.heading_margin);
                setProjectMargin(obj.project_margin);
                setMediaSize(obj.project_media_size);
            })  
        }).catch(console.error);
    }, []);

    return (
        <>
            <Style>
            {`
                /*page margins*/
                body, html {
                    margin: ${pageMargin}px;
                }

                /*project margins*/
                .project-container .project-media-container .navbar-item img, video {
                    margin: ${projectMargin}px;
                }

                /*heading text margins*/
                h1, h2 {
                    margin: ${headingMargin}px;
                }

                /*body text margins*/
                h3, h4, h5, h6, p {
                    margin: ${bodyMargin}px;
                }

                /*project media size*/
                .project-container video, img {
                    margin: ${projectMargin}px;
                }
            `}
            </Style>
        </>
    )
}

export default Misc;
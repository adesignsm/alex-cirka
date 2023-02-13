import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import sanityClient from "../../client";
import imageUrlBuilder from "@sanity/image-url";
import {Style} from "react-style-tag";

import Loading from "../Loading";

import $ from "jquery";
import "jquery-ui-bundle";

import "../../styles/archive/archive.css";

const Archive = () => {
    const [projectData, setProjectData] = useState([]);
    const [styleData, setStyleData] = useState([]);
    const [bodyBg, setBodyBg] = useState("");
    const [textColor, setTextColor] = useState("");

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

    const setPositionAndRotation = () => {
        let MIN_HEIGHT = 200, MAX_HEIGHT = 400;
        let MIN_WIDTH = 300, MAX_WIDTH = window.innerWidth / 2;
        let MIN_ROTATE = -20, MAX_ROTATE = 20;

        setTimeout(() => {
            let thumbnails = document.querySelectorAll(".thumbnail");
            thumbnails.forEach((thumbnail) => {
                thumbnail.style.top = `${Math.floor(Math.random() * (MAX_HEIGHT - MIN_HEIGHT + 1) + MIN_HEIGHT)}px`;
                thumbnail.style.left = `${Math.floor(Math.random() * (MAX_WIDTH - MIN_WIDTH + 1) + MIN_WIDTH)}px`;
    
                thumbnail.style.transform = `rotate(${Math.floor(Math.random() * (MAX_ROTATE - MIN_ROTATE + 1) + MIN_ROTATE)}deg)`;
                $(".thumbnail").draggable();
            });
        }, 10);
    }

    return (
        <>
            <Loading />
            <div id = "indexed-projects-container">
                {Object.keys(projectData).map((project) => {
                    let link = `/projects/${projectData[project].project_title}`;
                    let projectLink = link.replace(" ", "-");

                    return (
                        <div className="thumbnail">
                            <NavLink className="navbar-item" activeclassname="is-active" to={projectLink}> 
                                <img src={urlFor(projectData[project].project_media[0].asset._ref)} />
                            </NavLink>
                        </div>
                    )
                })}
                {setPositionAndRotation()}
            </div>
        </>
    )
}

export default Archive;
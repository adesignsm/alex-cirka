import React, {useState, useEffect} from "react";
import sanityClient from "../../client";

import {Style} from "react-style-tag";
import "../../styles/about/about.css";

import Loading from "../Loading";

const About = () => {
    const [aboutDescriptionData, setAboutDescriptionData] = useState("");
    const [aboutClientsData, setAboutClientsData] = useState([]);
    const [fontData, setFontData] = useState([]);
    const [aboutFont, setAboutFont] = useState([]);

    const editUrlString = (urlString) => {
        let strUrl = urlString.replace(/file-/g, "");
        strUrl = strUrl.replace("-", ".");

        return `https://cdn.sanity.io/files/ot5ilm3g/production/${strUrl}`;
    }

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "about"]{
                about_description,
                about_clients
              }`
        ).then((data) => {
            setAboutDescriptionData(data[0].about_description);
            setAboutClientsData(data[0].about_clients);
            sanityClient.fetch(
                `*[_type == "font"]{
                    font_file_upload,
                    font_name
                }`
            ).then((data) => {
                setFontData(data);
            }).catch((error) => {
                console.log(error);
            })
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    console.log(aboutClientsData);

    const sortFontData = (data) => {
        data.forEach((font) => {
            if (font.font_name === "About Page - hero description") {
                setAboutFont(editUrlString(font.font_file_upload.asset._ref));
            }
        })
    }

    useEffect(() => {
        sortFontData(fontData);
    });

    return (
        <>
            <Loading />
            <div id = "about-container">
                <div id = "about-description">
                    <Style>
                        {`
                            @font-face {
                                font-family: "About Font";
                                src: url(${aboutFont});
                            }
                            `
                        }
                    </Style>
                    <h1 style={{fontFamily: "About Font"}}>{aboutDescriptionData}</h1>
                </div>
                <div className="about-clients" style={{fontFamily: "About Font"}}>
                    <h1> Past Clients </h1>
                    <marquee width="100%" direction="left" height="100px">
                        <ul>
                            {aboutClientsData.map((client) => {
                                return (
                                    <li>{client}</li>
                                );
                            })}
                        </ul>
                    </marquee>
                </div>
            </div>
        </>
    )
}

export default About;
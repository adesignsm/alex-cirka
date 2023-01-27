import React, {useState, useEffect} from "react";
import sanityClient from "../../client";

import {Style} from "react-style-tag";
import "../../styles/about/about.css";

const About = () => {
    const [aboutData, setHeroData] = useState("");
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
                about_description
              }`
        ).then((data) => {
            setHeroData(data[0].about_description);
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
                    <h1 style={{fontFamily: "About Font"}}>{aboutData}</h1> 
                </div>
            </div>
        </>
    )
}

export default About;
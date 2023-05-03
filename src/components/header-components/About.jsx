import React, {useState, useEffect} from "react";
import emailjs from "emailjs-com";
import { Form, Input, TextArea, Button } from "semantic-ui-react";
import sanityClient from "../../client";

import {Style} from "react-style-tag";
import "../../styles/about/about.css";

import Loading from "../Loading";

const SERVICE_ID = "service_0segoxi";
const TEMPLATE_ID = "template_mhea5zf";
const USER_ID = "_4kt98Jj-6hp6cWoO";

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

    const sortFontData = (data) => {
        data.forEach((font) => {
            if (font.font_name === "About Page - hero description") {
                setAboutFont(editUrlString(font.font_file_upload.asset._ref));
            }
        })
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID).then((result) => {
            if (result.text === "OK") {
                document.querySelector(".submit-button").innerHTML = "Message sent. Thank you";
            } else {
                document.querySelector(".submit-button").innerHTML = "Sorry. Your message was not sent";
            }
        }, (error) => {
            console.log(error.text);
        });

        e.target.reset();
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
                    <marquee width="120%" direction="left" height="100px" scrollamount="7">
                        <ul>
                            {aboutClientsData.map((client) => {
                                return (
                                    <li>{client}</li>
                                );
                            })}
                        </ul>
                    </marquee>
                </div>
                <div className="contact-form-container">
                    <Form onSubmit={(e) => handleOnSubmit(e)}>
                        <Form.Field control={Input} name='user_email' placeholder='Email' required/>
                        <Form.Field control={Input} name='user_name'placeholder='Name' required />
                        <Form.Field control={TextArea} name='user_message' placeholder='Message'required/>
                        <Button className="submit-button" type='submit' color='green'>Submit</Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default About;
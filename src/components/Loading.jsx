import React, { useLayoutEffect, useEffect, useState } from "react";
import $ from "jquery";

import "../styles/loading/loading.css";

import {Style} from "react-style-tag";
import sanityClient from "../client";
import imageUrlBuilder from "@sanity/image-url";

const Loading = () => {
    const [loadingState, setLoadingState] = useState(true);
    const [loadingData, setLoadingData] = useState([]);
    const [loadingVideo, setLoadingVideo] = useState("");
    const [loadingDefaultImage, setLoadingDefaultImage] = useState();
    let loadingDefaultFlag = true;

    const builder = imageUrlBuilder(sanityClient);
    const urlFor = (source, width) => {
        return builder.image(source).auto('format').width(width).url();  
    }

    const editUrlString = (urlString) => {
        let strUrl = urlString.replace(/file-/g, "");
        strUrl = strUrl.replace("-", ".");

        return `https://cdn.sanity.io/files/ot5ilm3g/production/${strUrl}`;
    }

    const loadingReq = () => {
        return new Promise(resolve => setTimeout(() => {
            resolve();
        }, 2500));
    }

    const removeLoading = () => {
        if (loadingState === true) $("#loading-page-div").fadeOut(500);
    }

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "loading_screen"]{
                loading_video,
                audio_upload,
                default
              }`
        ).then((data) => {
            setLoadingData(data);
            if (loadingData.length > 0 && loadingData[0].hasOwnProperty("loading_video")) {
                setLoadingVideo(editUrlString(loadingData[0].loading_video[0].asset._ref));
            } else {
                setLoadingDefaultImage(urlFor(data[0].default.default_image.asset._ref));
            }
        }).catch(console.error);
    }, []);
    
    useLayoutEffect(() => {
        loadingReq().then(() => {
            const loadingScreen = document.getElementById("loading-page-div");

            if (loadingScreen) {
                removeLoading();
                setLoadingState(!loadingState);
            }
        })
    });

    // console.log(loadingVideo);
    // console.log(loadingDefaultImage);

    return (
        <>
            <div id="loading-page-div">
                <div id = "loading-container">
                    {loadingData.length > 0 && loadingData.length < 2 && loadingDefaultFlag === true &&
                        loadingData.map((item) => {
                            return (<h1> {item.default.default_text} </h1>)
                        })
                    }
                </div>
            </div>
            <Style>
                {`
                    #loading-container {
                        background-image: url(${loadingDefaultImage});
                    }
                `}
            </Style>
        </>
    )
}

export default Loading;
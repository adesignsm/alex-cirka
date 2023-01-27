import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import $ from "jquery";

import "./styles/root/root.css";
import Colors from "./components/Colors";

import Menu from "./components/main-components/Menu";
import Home from "./components/Home";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import About from "./components/header-components/About";
import Archive from "./components/header-components/Archive";
import SingleProject from "./components/main-components/sub-main-components/SingleProject";

const App = () => {
    const [loadingState, setLoadingState] = useState(false);

    setTimeout(() => {
        setLoadingState(true);
        removeLoading();
    }, 1000);

    const removeLoading = () => {
        if (loadingState === true) $("#loading-page-div").fadeOut(500);
    }

    return (
        <>
            <BrowserRouter>
                <Colors />
                <Menu />
                <div className="page-container">
                    <div id = "loading-page-div"><Loading /></div>
                    <Routes>
                        <Route path="/about" element={<About />} />
                        <Route exact path="/" element={<Home />} />
                        <Route path="/archive" element={<Archive />} />
                        <Route path="/projects/:projectId" element={<SingleProject />} />
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
        </>
    )
}

export default App;
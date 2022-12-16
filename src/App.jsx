import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import $ from "jquery";

import "./styles/root/root.css";

import Menu from "./components/main-components/Menu";

import Home from "./components/Home";
import Loading from "./components/Loading";
import Footer from "./components/Footer";

import About from "./components/header-components/About";
import Archive from "./components/header-components/Archive";

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
            <div id = "loading-page-div"><Loading /></div>
            <BrowserRouter>
                <Menu />
                <div className="page-container">
                    <Routes>
                        <Route path="/about" element={<About />}/>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/archive" element={<Archive />} />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default App;
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import $ from "jquery";

import "./styles/root/root.css";
import Colors from "./components/Colors";
import Misc from "./components/Misc";
import Background from "./components/Background";
import PageNotFound from "./components/PageNotFound";

import Menu from "./components/main-components/Menu";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/header-components/About";
import Archive from "./components/header-components/Archive";
import SingleProject from "./components/main-components/sub-main-components/SingleProject";

const App = () => {
    setInterval(() => {
        if (window.location.href.indexOf("/archive") != -1) {
            setTimeout(() => {
                document.getElementsByTagName("body")[0].style.backgroundColor = "#000";
                document.querySelector(".navbar").style.backgroundColor = "#000";

                document.querySelector("#main-menu-desktop a.navbar-item:nth-child(1)").style.color = "#F5FD9D";
                document.querySelector("#main-menu-desktop a.navbar-item:nth-child(2)").style.color = "#F5FD9D";
                document.querySelector("#main-menu-desktop a.navbar-item:nth-child(3)").style.color = "#F5FD9D";
            }, 500);
        } else {
            setTimeout(() => {
                document.getElementsByTagName("body")[0].style.backgroundColor = "#E3E192";
                document.querySelector(".navbar").style.backgroundColor = "#E3E192";
    
                document.querySelector("#main-menu-desktop a.navbar-item:nth-child(1)").style.color = "#000";
                document.querySelector("#main-menu-desktop a.navbar-item:nth-child(2)").style.color = "#000";
                document.querySelector("#main-menu-desktop a.navbar-item:nth-child(3)").style.color = "#000";
            }, 1000);
        }
    }, 100);

    return (
        <>
            <BrowserRouter>
                <Background />
                <Colors />
                <Misc />
                <Menu />
                <div className="page-container">
                    <Routes>
                        <Route path="/about" element={<About />} />
                        <Route exact path="/" element={<Home />} />
                        <Route path="/archive" element={<Archive />} />
                        <Route path="/projects/:projectId" element={<SingleProject />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                    <Footer />
                </div>
            </BrowserRouter>
        </>
    )
}

export default App;
// import "./App.css";
import React, { useState } from "react";
import Navbar from "./Navbar";

import News from "./News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import ajit from "../images/ajit.png";
import nishendu from "../images/nishendu.png";
import priyanshu from "../images/priyanshu.png";
import urniv from "../images/urniv.png";
import varun from "../images/varun.png";
import logo from "../images/logo.png"


const Home = () => {
    const pageSize = 15;
    const apiKey = process.env.REACT_APP_NEWS_API;

    const [progress, setProgress] = useState(0);
    const [mode, setMode] = useState("light");
    const [text, setText] = useState("DARK MODE");
    return (
        <>
            <div>
                <Navbar mode={mode} setMode={setMode} text={text} setText={setText} />
                <LoadingBar height={3} color="#f11946" progress={progress} />
            </div>
            <div>
                <section id="creators-section" className="container">
                    <h2>Website Created By</h2>
                    <div id="creators-container" className="flex">
                        <div className="creator">
                            <img src={ajit} alt="Person 1" />
                            <p>Ajit Mishra</p>
                        </div>
                        <div className="creator">
                            <img src={urniv} alt="Person 2" />
                            <p>Urniv Bosu</p>
                        </div>
                        <div className="creator">
                            <img src={nishendu} alt="Person 3" />
                            <p>Nishendu Mishra</p>
                        </div>
                        <div className="creator">
                            <img src={priyanshu} alt="Person 4" />
                            <p>Priyanshu Singh</p>
                        </div>
                        <div className="creator">
                            <img src={varun} alt="Person 5" />
                            <p>Varun Sharma</p>
                        </div>
                    </div>
                </section>
                <footer className="sticky-footer">
                    <div className="row">
                        <div className="col">
                            <img src={logo} className="logo" />
                            <p>
                                This is the official website of News Hut. You can comeback here for
                                latest news updates regarding the recent ongoing activites in the
                                world!
                            </p>
                        </div>
                        <div className="col">
                            <h3>
                                Office{" "}
                                <div className="underline">
                                    <span />
                                </div>{" "}
                            </h3>
                            <p>VIT Chennai</p>
                            <p>Vandalur-Kelambakkam Road, Chennai(600127)</p>
                            <p className="email-id">newshutofficial@gmail.com</p>
                            <h4>+91-988399829</h4>
                        </div>
                        <div className="col">
                            <h3>
                                Links{" "}
                                <div className="underline">
                                    <span />
                                </div>{" "}
                            </h3>
                            <ul>
                                <li>
                                    <a href="">Home</a>
                                </li>
                                <li>
                                    <a href="">Services</a>
                                </li>
                                <li>
                                    <a href="">About Us</a>
                                </li>
                                <li>
                                    <a href="">Features</a>
                                </li>
                                <li>
                                    <a href="">Contact Us</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col">
                            <h3>
                                News letters{" "}
                                <div className="underline">
                                    <span />
                                </div>{" "}
                            </h3>
                            <form>
                                <i className="fa-regular fa-envelope" />
                                <input type="email" placeholder="Enter your email" required="" />
                                <button type="submit">
                                    <i className="fa-solid fa-arrow-right" />
                                </button>
                            </form>
                            <div className="social-icons">
                                <i className="fa-brands fa-facebook" />
                                <i className="fa-brands fa-instagram" />
                                <i className="fa-brands fa-twitter" />
                                <i className="fa-brands fa-whatsapp" />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <p className="copyright">
                        News Hut Private Limited © 2023 - All Rights Reserved{" "}
                    </p>
                </footer>
            </div>
        </>
    );
};
export default Home;

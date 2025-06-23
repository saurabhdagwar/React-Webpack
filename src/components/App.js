import React from "react";
import MyImage from "../../public/apple.png"
import "./app.css"
import ButtonComp from "./shared/button";
import DashboardComp from "./dashboardComp";
import { lazy } from 'react';

const TestComp = lazy(() => import(/* webpackChunkName: 'TestCompChunk' */'./TestComp.js'));
const AppComponent = () => {
    console.log("API URL +++++++",API_URL )
    const fetchUserDetails = () => {
        console.log("Test User");
    }
    return (
        <div className="container">
            <div>App Component</div>
            <img src={MyImage} className="img-class"/>
            <ButtonComp/>
            <DashboardComp />
            <TestComp />
        </div>
    )
}
export default AppComponent;
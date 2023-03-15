import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../Components/Header/Header";

const MainPage = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default MainPage;
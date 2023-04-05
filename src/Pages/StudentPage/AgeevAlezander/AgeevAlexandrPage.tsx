import React from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import {Button, TextField} from "@mui/material";
import AsideMenu from "./AsideMenu/AsideMenu";
import {Outlet} from "react-router-dom";

const AgeevAlexandrPage = () => {
    return (
        <div>
            <Header studentFio={'Агеев Александр'}/>
            <ContentBlock>
               
            </ContentBlock>
        <AsideMenu></AsideMenu>
            <Outlet/>
        </div>
    );
};

export default AgeevAlexandrPage;

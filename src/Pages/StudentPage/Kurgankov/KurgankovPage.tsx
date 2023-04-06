import React from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import {Button, TextField} from "@mui/material";
import AsideMenu from "./AsideMenu/AsideMenu";
import {Outlet} from "react-router-dom";

const KurgankovPage = () => {
    return (
        <div>
            <Header studentFio={'Курганков Егор'}/>
            <ContentBlock>
                <AsideMenu></AsideMenu>
                <Outlet />
            </ContentBlock>
        
        </div>
    );
};

export default KurgankovPage;

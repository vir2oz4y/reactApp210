import React from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import {Button, TextField} from "@mui/material";
import AsideMenu from "./AsideMenu/AsideMenu";
import {Outlet} from "react-router-dom";

const UsanovaDaryaPage = () => {
    return (
        <div>
            <Header studentFio={'Усанова Дарья'}/>
            <ContentBlock>
                <AsideMenu></AsideMenu>
                <Outlet />
            </ContentBlock>
        
        </div>
    );
};

export default UsanovaDaryaPage;

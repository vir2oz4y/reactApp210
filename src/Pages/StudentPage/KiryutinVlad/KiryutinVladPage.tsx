import React from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import {Button, TextField} from "@mui/material";
import AsideMenu from "./AsideMenu/AsideMenu";
import {Outlet} from "react-router-dom";

const KiryutinVladPage = () => {
    return (
        <div>
            <Header studentFio={'Кирютин Владислав'}/>
            <ContentBlock>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                <TextField id="filled-basic" label="Filled" variant="filled" />
                Vlados
                <div><Button variant="text">Text</Button></div>
            </ContentBlock>
        <AsideMenu></AsideMenu>
            <Outlet/>
        </div>
    );
};

export default KiryutinVladPage;

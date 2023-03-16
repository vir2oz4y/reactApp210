import React from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AsideMenu from "./AsideMenu/AsideMenu";
import {Outlet} from "react-router-dom";
import "./TrubnikovTimurPage.scss";
const TrubnikovTimurPage = () => {
    return (
        <div>
            <Header studentFio={'Трубников Тимур'}/>

            <ContentBlock>
                <div className={'self_page_content'}>
                    <AsideMenu/>

                    <Outlet/>
                </div>

            </ContentBlock>
        </div>
    );
};

export default TrubnikovTimurPage;
import React from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AsideMenu from "./AsideMenu/AsideMenu";
import {Outlet} from "react-router-dom";
import "./DyakovDanilPage.scss";
const DyakovDanilPage = () => {
    return (
        <div>
            <Header studentFio={'Дьяков Данил'}/>

            <ContentBlock>
                <div className={'self_page_content'}>
                    <AsideMenu/>

                    <Outlet/>
                </div>

            </ContentBlock>
        </div>
    );
};

export default DyakovDanilPage;
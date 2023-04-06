import React from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import { Outlet } from "react-router-dom";
import "./BezlepkinaPage.scss"
import AsideMenu from './AsideMenu/AsideMenu';

const BezlepkinaPage = () => {
    return (
        <div>
            <Header studentFio={'Kaleria Bezlepkina'} />

            <ContentBlock>
                <div className={"self_page_content"}>
                    <AsideMenu />
                    <Outlet />
                </div>
            </ContentBlock>
        </div>
    );
};

export default BezlepkinaPage;
import React from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import AsideMenu from "./AsideMenu/AsideMenu";
import {Outlet} from "react-router-dom";
import "./KryuchkovNickPage.scss";

const KryuchkovNickPage = () => {
    return (
        <div>
            <Header studentFio={'Крючков Николай'}/>

            <ContentBlock>
                <div className={'self_page_content'}>
                    <AsideMenu/>

                    <Outlet/>
                </div>
            </ContentBlock>
        </div>
    );
};

export default KryuchkovNickPage;
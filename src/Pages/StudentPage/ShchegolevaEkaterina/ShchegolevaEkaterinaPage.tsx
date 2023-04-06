import React from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import { Outlet } from "react-router-dom";
import "./ShchegolevaEkaterinaPage.scss";
import AsideMenu from './AsideMenu/AsideMenu';

const ShchegolevaEkaterinaPage = () => {
    return (
        <div>
            <Header studentFio={'Shchegoleva Ekaterina'} />

            <ContentBlock>
                <div className={'self_page_content'}>
                    <AsideMenu />

                    <Outlet />
                </div>
            </ContentBlock>
        </div>
    );
};

export default ShchegolevaEkaterinaPage;
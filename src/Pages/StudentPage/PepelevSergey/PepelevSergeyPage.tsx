import React from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import "./PepelevSergeyPage.scss";
import AsideMenu from "./AsideMenu/AsideMenu";
import {Outlet} from "react-router-dom";


const PepelevSergeyPage = () => {
    return (
        <div>
            <Header studentFio={'Пепелев Сергей'}/>

            <ContentBlock>
                <AsideMenu/>
                <Outlet/>
            </ContentBlock>
        </div>
    );
};

export default PepelevSergeyPage;
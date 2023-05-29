import React, { useEffect } from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import AsideMenu from "./AsideMenu/AsideMenu";
import { Outlet } from "react-router-dom";
import "./ArtamonovPage.scss";
import axios from 'axios';


export const artamonovAxios = axios.create({})


const ArtamonovPage = () => {

    const doLogin = () => {
        axios.post<{ authToken: string }>('https://canstudy.ru/orderapi/user/login', {
            identifier: 'FD76C504-09E1-4514-B023-09DCC874BEE1'
        })
            .then(res => {
                artamonovAxios
                    .defaults
                    .headers
                    .common['Authorization'] = 'Bearer ' + res.data.authToken
            })
    }


    useEffect(() => {
        doLogin();
    }, [])

    return (
        <div>
            <Header studentFio={'Курганков Егор'} />

            <ContentBlock>
                <div className={'self_page_content'}>
                    <AsideMenu />

                    <Outlet />
                </div>
            </ContentBlock>
        </div>
    );
};

export default ArtamonovPage;
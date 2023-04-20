import React from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import { Outlet } from "react-router-dom";
import "./BezlepkinaPage.scss"
import AsideMenu from './AsideMenu/AsideMenu';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';


export const BezlepkinaAxios = axios.create({})


const BezlepkinaPage = () => {

    const doLogin = () => {
        axios.post<{ authToken: string }>('https://canstudy.ru/orderapi/user/login', {
            identifier: 'B40DD145-F553-4974-9E17-9A5BF35C34B2'
        })
            .then(res => {

                BezlepkinaAxios
                    .defaults
                    .headers
                .common['Authorization']='Bearer '+res.data.authToken
            })
    }
    useEffect(() => {
        doLogin();
    }, [])

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
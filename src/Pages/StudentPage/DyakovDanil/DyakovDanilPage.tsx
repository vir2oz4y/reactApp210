import React, { useEffect } from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import AsideMenu from "./AsideMenu/AsideMenu";
import {Outlet} from "react-router-dom";
import "./DyakovDanilPage.scss";
import axios from 'axios';


export const dyakovAxios = axios.create({})


const DyakovDanilPage = () => {

    const doLogin = () => {
        axios.post<{ authToken: string }>('https://canstudy.ru/orderapi/user/login', {
            identifier: 'd60a72f3-5ff2-4e37-bbb9-29159366586f'
        })
            .then(res => {
                dyakovAxios
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

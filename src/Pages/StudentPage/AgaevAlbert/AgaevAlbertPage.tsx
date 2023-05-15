import React, { useEffect } from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import AsideMenu from "./AsideMenu/AsideMenu";
import { Outlet } from "react-router-dom";
import "./AgaevAlbertPage.scss";
import axios from 'axios';

export const agaevAxios = axios.create({})

const AgaevAlbertPage = () => {

    const doLogin = () => {
        axios.post<{ authToken: string }>('https://canstudy.ru/orderapi/user/login', {
            identifier: '3CD00251-983C-4CCD-A521-77FAE56C4ED1'
        })
            .then(res => {
                agaevAxios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.authToken
            })
    }

    useEffect(() => {
        doLogin();
    }, [])

    return (
        <div>
            <Header studentFio={'Агаев Альберт'}/>
            <ContentBlock>
                <div className={'self_page_content'}>
                    <AsideMenu/>
                    <Outlet/>
                </div>
            </ContentBlock>
        </div>
    );
};

export default AgaevAlbertPage;
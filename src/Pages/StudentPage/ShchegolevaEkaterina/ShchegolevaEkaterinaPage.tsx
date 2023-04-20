import React from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import { Outlet } from "react-router-dom";
import "./ShchegolevaEkaterinaPage.scss";
import AsideMenu from './AsideMenu/AsideMenu';
import axios from 'axios';
import { useEffect } from 'react';


export const shchegolevaAxios = axios.create({})

const ShchegolevaEkaterinaPage = () => {
    const doLogin = () => {
        axios.post<{ authToken: string }>('https://canstudy.ru/orderapi/user/login', {
            identifier: '993D0C6A-3CFB-456C-9BA5-ADD5BC9FB80D'
        })
            .then(res => {
                shchegolevaAxios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.authToken
            })
    }
    useEffect(() => {
        doLogin();
    }, [])
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
import React, { useEffect } from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import AsideMenu from "./AsideMenu/AsideMenu";
import { Outlet } from "react-router-dom";
import "./KurgankovPage.scss";
import axios from 'axios';


export const kurgankovAxios = axios.create({})


const KurgankovPage = () => {

    const doLogin = () => {
        axios.post<{ authToken: string }>('https://canstudy.ru/orderapi/user/login', {
            identifier: '300fe41b-d135-4e4e-ab44-95eaf24273d5'
        })
            .then(res => {
                kurgankovAxios
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

export default KurgankovPage;
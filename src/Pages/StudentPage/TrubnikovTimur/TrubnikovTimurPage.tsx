import React, { useEffect } from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import AsideMenu from "./AsideMenu/AsideMenu";
import {Outlet} from "react-router-dom";
import "./TrubnikovTimurPage.scss";
import axios from 'axios';


export const trubnikovAxios = axios.create({})


const TrubnikovTimurPage = () => {

    const doLogin = () => {
        axios.post<{ authToken: string }>('https://canstudy.ru/orderapi/user/login', {
            identifier: '260d3e0b-5165-4f7e-b070-5300896bf80e'
        })
            .then(res => {
                trubnikovAxios
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
            <Header studentFio={'Трубников Тимур'}/>

            <ContentBlock>
                <div className={'self_page_content'}>
                    <AsideMenu/>

                    <Outlet/>
                </div>
            </ContentBlock>
        </div>
    );
};

export default TrubnikovTimurPage;

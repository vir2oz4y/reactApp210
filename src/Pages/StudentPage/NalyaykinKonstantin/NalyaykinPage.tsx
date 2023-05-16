import React, { useEffect } from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import AsideMenu from "./AsideMenu/AsideMenu";
import {Outlet} from "react-router-dom";
import "./NalyaykinPage.scss";
import axios from 'axios';


export const nalyaykinAxios = axios.create({})


const NalyaykinPage = () => {

    const doLogin = () => {
        axios.post<{ authToken: string }>('https://canstudy.ru/orderapi/user/login', {
            identifier: '4e0e4026-e041-435a-b1e1-2e891d4d3681'
        })
            .then(res => {
                nalyaykinAxios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.authToken
            })
    }

    useEffect(() => {
        doLogin();
    }, [])

    return (
        <div>
            <Header studentFio={'Наляйкин Константин'}/>

            <ContentBlock>
                <div className={'self_page_content'}>
                    <AsideMenu/>

                    <Outlet/>
                </div>
            </ContentBlock>
        </div>
    );
};

export default NalyaykinPage;

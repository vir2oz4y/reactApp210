import React, { useEffect } from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import AsideMenu from "./AsideMenu/AsideMenu";
import {Outlet} from "react-router-dom";
import "./AgeevAlexandrPage.scss";
import axios from 'axios';


export const ageevAxios = axios.create({})


const AgeevAlexandrPage = () => {

    const doLogin = () => {
        axios.post<{ authToken: string }>('https://canstudy.ru/orderapi/user/login', {
            identifier: '97304d31-b7f1-4b9b-b513-6533bf325d70'
        })
            .then(res => {
                ageevAxios
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
            <Header studentFio={'Агеев Александр'}/>

            <ContentBlock>
                <div className={'self_page_content'}>
                    <AsideMenu/>

                    <Outlet/>
                </div>
            </ContentBlock>
        </div>
    );
};

export default AgeevAlexandrPage;

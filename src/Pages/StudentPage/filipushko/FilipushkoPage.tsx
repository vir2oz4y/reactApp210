import React, { useEffect } from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import AsideMenu from "./AsideMenu/AsideMenu";
import {Outlet} from "react-router-dom";
import "./filipushkoPage.scss"
import axios from 'axios';
export const filipushkoAxios = axios.create({})
const FilipushkoPage = () => {
    const doLogin = () => {
        axios.post<{ authToken: string }>('https://canstudy.ru/orderapi/user/login', {
            identifier: '05DA6784-075D-4859-9B30-49457DC210EF'
        })
            .then(res => {
                filipushkoAxios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.authToken

            })
    }
    useEffect(() => {
        doLogin();
    }, [])
    return (
        <div>
            <Header studentFio={'Филипушко Михаил Евгеньевич'}/>

            <ContentBlock>
                <div className={"self_page_content"}>
                    <AsideMenu/>
                    <Outlet/>
                </div>
            </ContentBlock>
        </div>
    );
};

export default FilipushkoPage;
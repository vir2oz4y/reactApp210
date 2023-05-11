import React, {useEffect, useState} from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import {Button, TextField} from "@mui/material";
import AsideMenu from "./AsideMenu/AsideMenu";
import {Outlet} from "react-router-dom";
import axios from "axios";

export const kiryutinAxios = axios.create({})

const KiryutinVladPage = () => {

    const [authToken, setAuthToken] = useState('');

    const doLogin = () => {
        axios.post<{authToken:string}>('https://canstudy.ru/orderapi/user/login', {
            identifier: "C27A77F4-ED81-4B4A-8F54-550DB6ADC16F"
        })
            .then(res => {
                kiryutinAxios.defaults.headers.common['Authorization'] = "Bearer " + res.data.authToken
            })
    }

    useEffect(() => {
        doLogin()
    }, [])

    return (
        <div>
            <Header studentFio={'Кирютин Владислав'}/>
            <ContentBlock>
                <AsideMenu></AsideMenu>
                <Outlet/>
            </ContentBlock>
        </div>
    );
};

export default KiryutinVladPage;

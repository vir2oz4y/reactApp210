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
            identifier: "55910E3A-0857-4EC7-9EA0-F231DB8E26EB"
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

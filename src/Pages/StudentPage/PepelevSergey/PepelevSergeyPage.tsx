import {useEffect, useState} from 'react';
import React from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import "./PepelevSergeyPage.scss";
import AsideMenu from "./AsideMenu/AsideMenu";
import {Outlet} from "react-router-dom";
import axios from "axios";

export const pepelevAxios = axios.create({})


const PepelevSergeyPage = () => {
    const [authToken, setAuthToken] = useState('');

    const doLogin = () => {
        axios.post<{authToken:string}>('https://canstudy.ru/orderapi/user/login', {
            identifier: "210D0B55-9B95-44AE-A8B8-B25D00159A47"
        })
            .then(res => {
                pepelevAxios.defaults.headers.common['Authorization'] = "Bearer " + res.data.authToken
            })
    }

    useEffect(() => {
        doLogin()
    }, [])

    return (
        <div>
            <Header studentFio={'Пепелев Сергей'}/>

            <ContentBlock>
                <AsideMenu/>
                <Outlet/>
            </ContentBlock>
        </div>
    );
};

export default PepelevSergeyPage;
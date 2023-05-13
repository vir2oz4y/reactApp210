import React, {useEffect, useState} from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import AsideMenu from "./AsideMenu/AsideMenu";
import {Outlet} from "react-router-dom";
import "./SakoyanIvanPage.scss"
import axios from "axios";

export const sakoyanAxios = axios.create({})

const SakoyanIvanPage = () => {

    const [authToken, setAuthToken] = useState('');

    const doLogin = () => {
        axios.post<{authToken:string}>('https://canstudy.ru/orderapi/user/login', {
            identifier: "51910E3A-0857-4EC7-9EA0-F231DB8E26EB"
        })
            .then(res => {
                sakoyanAxios.defaults.headers.common['Authorization'] = "Bearer " + res.data.authToken
            })
    }

    useEffect(() => {
        doLogin()
    }, [])

    return (
        <div>
            <Header studentFio={'Сакоян Иван'}/>

            <ContentBlock>
                <div className={"self_page_content"}>
                    <AsideMenu/>
                    <Outlet/>
                </div>
            </ContentBlock>
        </div>
    );
};

export default SakoyanIvanPage;
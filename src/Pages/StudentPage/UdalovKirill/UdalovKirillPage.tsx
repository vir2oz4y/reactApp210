import React, { useEffect } from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import AsideMenu from "./AsideMenu/AsideMenu";
import {Outlet} from "react-router-dom";
import "./UdalovKirillPage.scss";
import axios from 'axios';


export const udalovAxios = axios.create({})


const UdalovKirillPage = () => {

    const doLogin = () => {
        axios.post<{ authToken: string }>('https://canstudy.ru/orderapi/user/login', {
            identifier: '96CBFEBE-D484-433C-B511-ACFDCE2C57D0'
        })
            .then(res => {
                udalovAxios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.authToken
            })
    }

    useEffect(() => {
        doLogin();
    }, [])

    return (
        <div>
            <Header studentFio={'Удалов Кирилл'}/>

            <ContentBlock>
                <div className={'self_page_content'}>
                    <AsideMenu/>

                    <Outlet/>
                </div>
            </ContentBlock>
        </div>
    );
};

export default UdalovKirillPage;
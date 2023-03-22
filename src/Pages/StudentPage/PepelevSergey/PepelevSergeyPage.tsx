import React from 'react';
import Header from "../../../Components/Header/Header";
import ContentBlock from "../../../Components/ContentBlock/ContentBlock";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AsideMenu from "./AsideMenu/AsideMenu";
import {Outlet} from "react-router-dom";


const PepelevSergeyPage = () => {
    return (
        <div>
            <Header studentFio={'Пепелев Сергей'}/>

            <ContentBlock>
                <div>BOSS OF THE GYM</div>
                <div className={'WrapInput'}>
                    <div>
                        <TextField id="outlined-basic" label="Говори" variant="outlined" />
                        <TextField id="outlined-basic" label="Адрес" variant="outlined" />
                    </div>
                    <div>
                        <Button variant="outlined">Отправить коллекторов</Button>
                    </div>
                </div>
                <AsideMenu/>
                <Outlet/>
            </ContentBlock>
        </div>
    );
};

export default PepelevSergeyPage;
import {List, ListItem, ListItemButton, ListItemText} from '@mui/material';
import React from 'react';
import "./AsideMenu.scss";
import {useNavigate} from "react-router-dom";

const AsideMenu = () => {

    const navigate = useNavigate();

    return (
        <List className={'aside'}>

            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('category')}>
                    <ListItemText primary="Категории"/>
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('client')}>
                    <ListItemText primary="Клиенты"/>
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('manufacturer')}>
                    <ListItemText primary="Производители"/>
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('order')}>
                    <ListItemText primary="Заказы"/>
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('product')}>
                    <ListItemText primary="Товары" />
                </ListItemButton>
            </ListItem>
        </List>

    );
};

export default AsideMenu;
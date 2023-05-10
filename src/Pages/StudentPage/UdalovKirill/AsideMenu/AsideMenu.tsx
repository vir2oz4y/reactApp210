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
                    <ListItemText primary="Category"/>
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('client')}>
                    <ListItemText primary="ClientPage"/>
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('Manufacturer')}>
                    <ListItemText primary="Manufacturer"/>
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('Order')}>
                    <ListItemText primary="Order"/>
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('Product')}>
                    <ListItemText primary="ProductPage" />
                </ListItemButton>
            </ListItem>
        </List>

    );
};

export default AsideMenu;
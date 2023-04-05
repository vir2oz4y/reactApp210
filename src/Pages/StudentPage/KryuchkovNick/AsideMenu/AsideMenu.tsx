import {List, ListItem, ListItemButton, ListItemText} from '@mui/material';
import React from 'react';
import "./AsideMenu.scss";
import {useNavigate} from "react-router-dom";

const AsideMenu = () => {

    const navigate = useNavigate();

    return (
        <List className={'aside'}>

            <ListItem disablePadding>
                <ListItemButton onClick={()=>navigate('category')}>
                    <ListItemText primary="Category" />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('manufacture')}>
                    <ListItemText primary="Manufacture" />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('client')}>
                    <ListItemText primary="Client" />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('product')}>
                    <ListItemText primary="Product" />
                </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('order')}>
                    <ListItemText primary="Order" />
                </ListItemButton>
            </ListItem>
        </List>
    );
};

export default AsideMenu;
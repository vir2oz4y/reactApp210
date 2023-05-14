import React from 'react';
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import "./AsideMenu.scss";
import {useNavigate} from "react-router-dom";
const AsideMenu = () => {

    const navigate = useNavigate();


    return (
        <List className ={'aside'}>
            <ListItem disablePadding>
                <ListItemButton onClick = {()=>navigate('category')}>
                    <ListItemText primary="Category" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick = {()=>navigate('client')}>
                    <ListItemText primary="ClientPage" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('manufacturer')}>
                    <ListItemText primary="Manufacturer" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('order')}>
                    <ListItemText primary="Order" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('product')}>
                    <ListItemText primary="ProductPage" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('purchase')}>
                    <ListItemText primary="Purchase" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('user')}>
                    <ListItemText primary="User" />
                </ListItemButton>
            </ListItem>
        </List>
    );
};

export default AsideMenu;
import React from 'react';
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import "./AsideMenu.scss";
import {useNavigate} from "react-router-dom";
const AsideMenu = () => {

    const navigate = useNavigate();


    return (
        <List className ={'aside'}>
            
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('category')}>
                    <ListItemText primary="Category" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('test2')}>
                    <ListItemText primary="Client" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('test2')}>
                    <ListItemText primary="Manufacturer" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('test2')}>
                    <ListItemText primary="Order" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('test2')}>
                    <ListItemText primary="Purchase" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('test2')}>
                    <ListItemText primary="User" />
                </ListItemButton>
            </ListItem>
        </List>
    );
};

export default AsideMenu;
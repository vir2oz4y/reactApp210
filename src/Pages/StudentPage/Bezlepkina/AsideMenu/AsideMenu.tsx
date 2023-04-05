import React from 'react';
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import "./AsideMenu.scss";
import { useNavigate } from "react-router-dom";

const AsideMenu = () => {

    const navigate = useNavigate();

    return (
        <List className={'aside'}>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('Category')}>
                    <ListItemText primary="Category" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('Client')}>
                    <ListItemText primary="Client" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('Manufacturer')}>
                    <ListItemText primary="Manufacturer" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('Order')}>
                    <ListItemText primary="Order" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('Product')}>
                    <ListItemText primary="Product" />
                </ListItemButton>
            </ListItem>
        </List>
    );
};

export default AsideMenu;
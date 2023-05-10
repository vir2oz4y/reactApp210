import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import "./AsideMenu.scss";
import {useNavigate} from "react-router-dom";

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
                    <ListItemText primary="ClientPage" />
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
                    <ListItemText primary="ProductPage" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('Purchase')}>
                    <ListItemText primary="Purchase" />
                </ListItemButton>
            </ListItem>
        </List>
    );
};

export default AsideMenu;
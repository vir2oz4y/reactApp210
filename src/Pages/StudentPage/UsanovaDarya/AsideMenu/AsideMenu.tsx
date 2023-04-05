import React from 'react';
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import "./AsideMenu.scss";
import {useNavigate} from "react-router-dom";

const AsideMenu = () => {

    const navigate = useNavigate();

    return (
        <List className={'aside'}>
            <ListItem disablePadding>
                <ListItemButton onClick={()=>navigate('Test1')}>
                    <ListItemText primary="Test1" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={()=>navigate('Test2')}>
                    <ListItemText primary="Test2" />
                </ListItemButton>
            </ListItem>
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
        </List>
    );
};

export default AsideMenu;
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
                <ListItemButton onClick={() => navigate('Test1')}>
                    <ListItemText primary="Test 1" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('Test2')}>
                    <ListItemText primary="Test 2" />
                </ListItemButton>
            </ListItem>
        </List>
    );
};

export default AsideMenu;
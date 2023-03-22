import {List, ListItem, ListItemButton, ListItemText} from '@mui/material';
import React from 'react';
import  "./AsideMenu.scss"
import {useNavigate} from "react-router-dom";

const AsideMenu = () => {
    const navigate = useNavigate();
    return (
        <List className={'aside'}>
            <ListItem className={'asideListItem'} disablePadding>
                <ListItemButton onClick={()=>navigate('test1')}>
                    <ListItemText primary="Trash" />
                </ListItemButton>
            </ListItem>
            <ListItem className={'asideListItem'} disablePadding>
                <ListItemButton onClick={()=>navigate('test2')}>
                    <ListItemText primary="Spam" />
                </ListItemButton>
            </ListItem>
        </List>
    );
};

export default AsideMenu;
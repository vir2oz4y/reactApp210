import {List, ListItem, ListItemButton, ListItemText} from '@mui/material';
import React from 'react';
import  "./AsideMenu.scss"
import {useNavigate} from "react-router-dom";

const AsideMenu = () => {
    const navigate = useNavigate();
    return (
        <List className={'aside'}>
            <ListItem className={'asideListItem'} disablePadding>
                <ListItemButton onClick={()=>navigate('Test1')}>
                    <ListItemText primary="Trash" />
                </ListItemButton>
            </ListItem>
            <ListItem className={'asideListItem'} disablePadding>
                <ListItemButton onClick={()=>navigate('Test2')}>
                    <ListItemText primary="Spam" />
                </ListItemButton>
            </ListItem>
            <ListItem className={'asideListItem'} disablePadding>
                <ListItemButton onClick={()=>navigate('Category')}>
                    <ListItemText primary="Category" />
                </ListItemButton>
            </ListItem>
            <ListItem className={'asideListItem'} disablePadding>
                <ListItemButton onClick={()=>navigate('Client')}>
                    <ListItemText primary="Client" />
                </ListItemButton>
            </ListItem>
            <ListItem className={'asideListItem'} disablePadding>
                <ListItemButton onClick={()=>navigate('Manufactur')}>
                    <ListItemText primary="Manufactur" />
                </ListItemButton>
            </ListItem>
            <ListItem className={'asideListItem'} disablePadding>
                <ListItemButton onClick={()=>navigate('Order')}>
                    <ListItemText primary="Order" />
                </ListItemButton>
            </ListItem>
            <ListItem className={'asideListItem'} disablePadding>
                <ListItemButton onClick={()=>navigate('Product')}>
                    <ListItemText primary="Product" />
                </ListItemButton>
            </ListItem>
        </List>
    );
};

export default AsideMenu;
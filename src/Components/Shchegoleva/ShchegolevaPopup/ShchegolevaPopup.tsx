import { Button, Typography } from '@mui/material';
import { Modal } from '@mui/material';
import React from 'react';
import "./ShchegolevaPopup.scss";
type Props =
    {
        open: boolean,
        onClose: () => void;
        children: any,
        title:string
    }
const ShchegolevaPopup = ({ open, onClose,children ,title}:Props) => {
    return (<Modal
        open={open}
        onClose={() => onClose()}>
        <Typography className='shchegoleva_popup'>
            <div className='shchegoleva_popup__content'>
                <div className='shchegoleva_popup__content__header'>
                    <div> {title}</div>
                    <div><Button onClick={()=>onClose()}>close</Button></div>
                </div>
                {children}
                </div>
        </Typography>
    </Modal>)
}
export default ShchegolevaPopup;
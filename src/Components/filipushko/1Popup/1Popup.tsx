import { Button, Modal, Typography } from '@mui/material';
import React from 'react';
import "./1Popup.scss";

export type IPopup={
    open: boolean,
    onClose: () => void;
}

type Props =IPopup & {

    children: any;
    title: string;
}
const FilipushkoPopup = ({ open, onClose, children,title }:Props) => {
    return (
        <Modal
            open={open}
            onClose={()=>onClose()}
        >
            <Typography  className='filipushko_popup'>
                <div className='filipushko_popup__content'>
                    <div className='filipushko_popup__content__header'>
                        <div>
                            {title}
                        </div>
                        <div>
                            <Button onClick={() => onClose()}>Close</Button>
                        </div>
                    </div>
                {children}
                </div>
            </Typography>
            </Modal>
    );
};
export default FilipushkoPopup;


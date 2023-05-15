import { Button, Modal, Typography } from '@mui/material';
import React from 'react';
import "./AgaevPopup.scss"

export type IPopup = {
    open: boolean,
    onClose: () => void;
}

type Props = IPopup & {
    children: any,
    title: string
}


const AgaevPopup = ({ open, onClose, children, title } : Props) => {

    return (
        <Modal open={open} onClose={() => onClose()}>
        <Typography className='agaev_popup'>
            <div className='agaev_popup__content'>
                <div className='agaev_popup__content__header'>
                    <div>
                        {title}
                    </div>
                    <div>
                        <Button onClick={() => onClose()}>
                            Закрыть
                        </Button>
                    </div>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </Typography>
        </Modal>)
}
export default AgaevPopup
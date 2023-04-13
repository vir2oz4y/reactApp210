import { Button, Typography } from '@mui/material';
import { Modal } from '@mui/material';
import React from 'react';
import "./BezlepkinaPopup.scss"

export type IPopup = {
    open: boolean,
    onClose: ()=> void;
}

type Props = IPopup &{
    children: any,
    title: string
}
const BezlepkinaPopup = ({ open, onClose, children, title }: Props) => {
    return (
      < Modal
    open = { open }
    onClose = {()=> onClose() }
        >
            <Typography className='popup_bezlepkina'>
                <div className='popup_bezlepkina_content'>
                    <div className='popup_bezlepkina_content_header'>
                        <div>
                            {title}
                        </div>
                        <div>
                            <Button onClick={() => onClose()}>
                                close
                            </Button>
                        </div>
                    </div>
                {children}
                </div>
            </Typography>
        </Modal>
    )
}

export default BezlepkinaPopup;
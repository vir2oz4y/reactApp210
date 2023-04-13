import { Button, Modal, Typography } from '@mui/material';
import React from 'react';
import "./UdalovPopup.scss"

export type IPopup = {
    open: boolean,
    onClose: () => void;
}

type Props = IPopup & {
    children: any,
    title: string
}


const UdalovPopup = ({ open, onClose, children, title } : Props) => {

    return (<Modal
        open={open}
        onClose={() => onClose()}>
        <Typography className='udalov_popup'>
            <div className='udalov_popup__content'>
                <div className='udalov_popup__content__header'>
                    <div>
                        {title}
                    </div>
                    <div>
                        <Button onClick={() => onClose()}>
                            Close
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
export default UdalovPopup
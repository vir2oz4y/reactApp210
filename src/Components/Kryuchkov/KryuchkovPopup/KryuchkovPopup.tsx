import { Button, Modal, Typography } from '@mui/material';
import React from 'react';
import "./KryuchkovPopup.scss";

export type IPopup = {
    open: boolean,
    onClose: () => void;
}


type Props = IPopup & {
    children: any,
    title: string
}

const KryuchkovPopup = ({ open, onClose, children, title}: Props) => {


    return (<Modal
        open={open}
        onClose={()=>onClose()}
    >
        <Typography className='kryuchkov_popup'>
            <div className='kryuchkov_popup__content'>
                <div className='kryuchkov_popup__content__header'>
                    <div>
                        {title}
                    </div>

                    <div>
                        <Button
                            onClick={() => onClose()}
                        >
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

export default KryuchkovPopup;
import React from 'react';
import {Modal, Typography} from "@mui/material";
import "./PepelevPopup.scss";

export type IPopup = {
    open: boolean,
    onClose: ()=> void;
}

type Props = IPopup & {

    children:any
    title: string
}
const PepelevPopup = ({open, onClose, children, title}: Props) => {
    return (
        <Modal
            open={open}
            onClose={() => onClose()}>

            <Typography className={'Pepelev_popup'}>
                <div className={'Pepelev_popup__content'}>
                    <div className={'Pepelev_popup__content__header'}>
                        <div>
                            {title}
                        </div>
                        <div>
                            <button
                            onClick={() => onClose()}>Close</button>
                        </div>
                    </div>

                    <div>
                        {children}
                    </div>
                </div>
            </Typography>
        </Modal>
    );
};

export default PepelevPopup;
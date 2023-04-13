import React from 'react';
import {Modal, Typography} from "@mui/material";
import "./TrubnikovPopup.scss"

export type IPopup={
    open:boolean,
    onClose: ()=> void;

}
type Props = IPopup &{
    children:any
    title: string
}
const TrubnikovPopup = ({open,onClose,children,title}:Props) =>{
    return (
        <Modal
            open = {open}
            onClose ={() => onClose()}>
            <Typography className={'Trubnikov_popup'}>
                <div className={'Trubnikov_popup__content'}>
                    <div className={'Trubnikov_popup__content__header'}>
                        <div>
                            {title}
                        </div>
                        <div>
                            <button onClick = {()=> onClose()}></button>
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
export default TrubnikovPopup;
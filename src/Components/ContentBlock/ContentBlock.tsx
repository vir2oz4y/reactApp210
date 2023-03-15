import React from 'react';
import {Typography} from "@mui/material";
import "./ContentBlock.scss";

type Props = {
    children:any
}
const ContentBlock = ({children}:Props) => {
    return (
        <Typography className={'content_block'}>
            {children}
        </Typography>
    );
};

export default ContentBlock;
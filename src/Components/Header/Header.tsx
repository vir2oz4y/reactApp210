import React from 'react';
import "./Header.scss";
import { Typography } from "@mui/material";

type Props = {
    studentFio?: string
}

const Header = ({ studentFio }: Props) => {
    return (
        <Typography className={"header"}>
            <div className={'header__university'}>
                НГАСУ
            </div>

            <div className={'header__group'}>
                {studentFio}
            </div>
        </Typography>
    );
};

export default Header;
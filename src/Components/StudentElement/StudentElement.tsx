import React from 'react';
import "./StudentElement.scss";
import {Avatar, Typography} from "@mui/material";
import * as cluster from "cluster";
import {useNavigate} from "react-router-dom";

type Props = {
    fio:string,
    imageSrc?:string,
    description:string,
    navigateTo:string
}
const StudentElement = ({fio, imageSrc, description, navigateTo}:Props) => {

    const navigate = useNavigate();

    return (
        <Typography className={"student_element"} onClick={()=>navigate(navigateTo)}>

            <div className={'student_element__icon'}>
                <Avatar
                    sx={{
                        width: "6em",
                        height: '6em'
                    }}
                    alt={fio}
                    src={imageSrc}
                />
            </div>

            <div className={'student_element__name'}>
                {fio}
            </div>


            <div className={'student_element__desc'}>
                {description}
            </div>
        </Typography>
    );
};

export default StudentElement;
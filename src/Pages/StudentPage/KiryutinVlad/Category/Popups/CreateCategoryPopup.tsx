import React, {useEffect, useState} from 'react';
import KiryutinPopup, {IPopup} from "../../../../../Components/KiryutinVlad/KiryutinPopup/KiryutinPopup";
import {Button, TextField} from "@mui/material";
import {Category} from "../models";
import axios from "axios";
import {kiryutinAxios} from "../../KiryutinVladPage";

type Props = IPopup & {
    onCreate: (newCategory:Category) => void;
}

const CreateCategoryPopup = ({open, onClose, onCreate}:Props) => {
    const createCategory = () => {
        kiryutinAxios.post<{ item:Category }>('https://canstudy.ru/orderapi/category',
            {
                name:categoryName
            })
            .then(res => {
                onCreate(res.data.item)
            })
    }

    const [categoryName, setCategoryName] = useState('')

    const onCreateClick = () => {
        createCategory()

        onClose();
    }

    return (
        <KiryutinPopup open={open} onClose={() => onClose()} title={"Создать категорию"}>
            <div style={{display:"flex", justifyContent:"center", gap:"10px"}}>
                <TextField
                    id="standard-basic"
                    label="Название категории"
                    variant="standard"
                    fullWidth={true}
                    value={categoryName}
                    onChange={e => setCategoryName(e.target.value)}
                />
                <Button
                    color={'primary'}
                    variant={'contained'}
                    onClick={() => onCreateClick()}
                >Создать</Button>
            </div>
        </KiryutinPopup>
    )
}

export default CreateCategoryPopup;
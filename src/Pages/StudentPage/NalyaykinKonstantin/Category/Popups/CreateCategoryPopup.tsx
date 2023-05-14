import React, {useEffect, useState} from 'react';
import {Button, TextField} from "@mui/material";
import {Category} from "../models";
import axios from 'axios';
import {nalyaykinAxios} from "../../NalyaykinPage";
import NalyaykinPopup, {IPopup} from "../../../../../Components/Nalyaykin/NalyaykinPopup/NalyaykinPopup";


type Props = IPopup & {
    onCreate:(newCategory:Category) => void;
}

const CreateCategoryPopup = ({open, onClose, onCreate}:Props) => {

    const [categoryName, setCategoryName] = useState('')

    const createCategory = () => {
        nalyaykinAxios.post<{ item: Category }>('https://canstudy.ru/orderapi/category',
            {
                name: categoryName
            })
            .then(res => {
                onCreate(res.data.item)
            })
    }


    const onCreateclick = () => {
        createCategory();
        onClose()
    }

    return (
        <NalyaykinPopup title='Создание категории' open={open} onClose={() => onClose()}>
            <div style = {{display: 'flex', flexDirection: 'column', gap: '1em'}}>
                <TextField label="Название категории" variant="standard" fullWidth={true}
                           value = {categoryName} onChange={e => setCategoryName(e.target.value)} />
                <div style = {{display: 'flex', justifyContent:'center'}}>
                    <Button color = {'primary'} variant = {'contained'} onClick={() => onCreateclick()}>
                        Создать
                    </Button>
                </div>
            </div>
        </NalyaykinPopup>
    );
};

export default CreateCategoryPopup;
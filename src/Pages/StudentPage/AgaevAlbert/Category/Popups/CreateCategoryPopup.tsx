import React, {useEffect, useState} from 'react';
import AgaevPopup, {IPopup} from "../../../../../Components/Agaev/AgaevPopup/AgaevPopup";
import {Button, TextField} from "@mui/material";
import {Category} from "../Models";
import { agaevAxios } from '../../AgaevAlbertPage';

type Props = IPopup & {
    onCreate:(newCategory:Category) => void;
}

const CreateCategoryPopup = ({open, onClose, onCreate}:Props) => {

    const [categoryName, setCategoryName] = useState('')

    const createCategory = () => {
        agaevAxios.post<{ item: Category }>('https://canstudy.ru/orderapi/category',
            {
                name: categoryName
            })
            .then(res => {
                onCreate(res.data.item)
            })
    }

    const onCreateClick = () => {
        createCategory();
        onClose()
    }

    return (
        <AgaevPopup title='Создание категории' open={open} onClose={() => onClose()}>
            <div style = {{display: 'flex', flexDirection: 'column', gap: '1em'}}>
                <TextField label="Название категории" variant="standard" fullWidth={true}
                           value = {categoryName} onChange={e => setCategoryName(e.target.value)} />
                <div style = {{display: 'flex', justifyContent:'center'}}>
                    <Button color = {'primary'} variant = {'contained'} onClick={() => onCreateClick()}>
                        Создать
                    </Button>
                </div>
            </div>
        </AgaevPopup>
    );
};

export default CreateCategoryPopup;
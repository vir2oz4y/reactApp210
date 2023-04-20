import React, {useState} from 'react';
import UdalovPopup, {IPopup} from "../../../../../Components/Udalov/UdalovPopup/UdalovPopup";
import {Button, TextField} from "@mui/material";
import {Category} from "../Models";
import { udalovAxios } from '../../UdalovKirillPage';

type Props = IPopup & {
    onEdit:(newCategory:Category) => void;
    category: Category
}

const EditCategoryPopup = ({open, onClose, category, onEdit}:Props) => {

    const [categoryEdit, setCategoryEdit] = useState(category)


    const onEditClick = () => {
        udalovAxios.patch(`https://canstudy.ru/orderapi/category`,
            {
                item: categoryEdit
            }
        )
            .then(res => {
                onEdit(categoryEdit)
            })
         onClose()
    }

    return (
        <UdalovPopup title='Создание категории' open={open} onClose={() => onClose()}>
            <div style = {{display: 'flex', flexDirection: 'column', gap: '1em'}}>
                <TextField label="Название категории" variant="standard" fullWidth={true}
                           value = {categoryEdit.name} onChange={e => setCategoryEdit(prev => ({...prev, name: e.target.value}))} />
                <div style = {{display: 'flex', justifyContent:'center'}}>
                    <Button color = {'primary'} variant = {'contained'} onClick={() => onEditClick()}>
                        Создать
                    </Button>
                </div>
            </div>
        </UdalovPopup>
    );
};

export default EditCategoryPopup;
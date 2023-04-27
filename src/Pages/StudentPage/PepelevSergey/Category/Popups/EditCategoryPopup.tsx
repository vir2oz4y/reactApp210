import React, {useEffect, useState} from 'react';
import PepelevPopup, {IPopup} from "../../../../../Components/Pepelev/PepelevPopup/PepelevPopup";
import {Button, TextField} from "@mui/material";
import {Category} from "../model";
import axios from "axios/index";
import {pepelevAxios} from "../../PepelevSergeyPage"

type Props = IPopup & {
    onEdit:(newCategory:Category)=>void;
    category:Category
}
const EditCategoryPopup = ({open, onClose, category, onEdit}:Props) => {

    // TODO:
    const editCategory = () => {
        pepelevAxios.patch<{ item:Category }>('https://canstudy.ru/orderapi/category',
            {
                id:category.id,
                name:category.name
            })
            .then(res => {
                onEdit(res.data.item)
            })
    }

    const [categoryEdit, setCategoryEdit] = useState(category)

    const onEditClick = () => {
        pepelevAxios.patch<{ item:Category }>('https://canstudy.ru/orderapi/category',
            {
                item:
                    {
                        id:category.id,
                        name:category.name
                    }
            })
            .then(res => {
                onEdit(categoryEdit)
                onClose();
            })
    }
    return (
        <PepelevPopup
            title={'Создание категории'}
            open={open}
            onClose={()=> onClose()}>
            <div style={{display:"flex", flexDirection:"column", gap: "1em"}}>
                <TextField label="Название категории" variant="standard" fullWidth={true}
                           value={categoryEdit.name}
                           onChange={e=>setCategoryEdit(prev=> ({...prev, name: e.target.value}))}/>
            </div>
            <div style={{display:"flex" , justifyContent:"center"}}>
                <Button color={'primary'}
                        variant={'contained'}
                        onClick={()=>onEditClick()}>
                    изменить
                </Button>
            </div>
        </PepelevPopup>
    );
};

export default EditCategoryPopup;
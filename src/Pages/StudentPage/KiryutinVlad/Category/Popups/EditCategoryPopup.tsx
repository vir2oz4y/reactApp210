import React, {useState} from 'react';
import KiryutinPopup, {IPopup} from "../../../../../Components/KiryutinVlad/KiryutinPopup/KiryutinPopup";
import {Category} from "../models";
import {Button, TextField} from "@mui/material";
import {kiryutinAxios} from "../../KiryutinVladPage";

type Props = IPopup & {
    onEdit: (newCategory:Category) => void;
    category:Category;
}

const EditCategoryPopup = ({open, onClose, category, onEdit}:Props) => {
    // TODO:
    const editCategory = () => {
        kiryutinAxios.patch<{ item:Category }>('https://canstudy.ru/orderapi/category',
            {
                item: {
                    id:category.id,
                    name:category.name
                }
            })
            .then(res => {
                onEdit(categoryEdit)
                onClose()
            })
    }


    const [categoryEdit, setCategoryEdit] = useState(category)

    const onEditClick = () => {
        editCategory();
    }

    return (
        <KiryutinPopup open={open} onClose={() => onClose()} title={"Изменить категорию"}>
            <div style={{display:"flex", justifyContent:"center", gap:"10px"}}>
                <TextField
                    id="standard-basic"
                    label="Название категории"
                    variant="standard"
                    fullWidth={true}
                    value={categoryEdit.name}
                    onChange={e => setCategoryEdit(prev => ({...prev, name:e.target.value}))}
                />
                <Button
                    color={'primary'}
                    variant={'contained'}
                    onClick={() => onEditClick()}
                >Изменить</Button>
            </div>
        </KiryutinPopup>
    )
}

export default EditCategoryPopup;
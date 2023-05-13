import React, {useEffect, useState} from 'react';
import SakoyanPopup, {IPopup} from "../../../../../Components/SakoyanIvan/SakoyanPopup/SakoyanPopup";
import {Button, TextField} from "@mui/material";
import {Category} from "../Models";
import axios from "axios";
import {sakoyanAxios} from "../../SakoyanIvanPage";

type Props = IPopup & {
    onCreate: (newCategory:Category) => void;
}

const CreateCategoryPopup = ({open, onClose, onCreate}:Props) => {

    const createCategory = () => {
        sakoyanAxios.post<{ item:Category }>('https://canstudy.ru/orderapi/category',
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
        <SakoyanPopup open={open} onClose={() => onClose()} title={"Создать категорию"}>
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
        </SakoyanPopup>
    )
}

export default CreateCategoryPopup;
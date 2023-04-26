import React, {useState, useEffect} from 'react';
import PepelevPopup, {IPopup} from "../../../../../Components/Pepelev/PepelevPopup/PepelevPopup";
import {Button, TextField} from "@mui/material";
import {Category} from "../model";
import axios from "axios";
import {pepelevAxios} from "../../PepelevSergeyPage";


type Props = IPopup & {
    onCreate:(newCategory:Category)=>void;
}
const CreateCategoryPopup = ({open, onClose, onCreate}:Props) => {
    const createCategory = () => {
        pepelevAxios.post<{ item:Category }>('https://canstudy.ru/orderapi/category',
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
        <PepelevPopup
            title={'Создание категории'}
            open={open}
            onClose={()=> onClose()}>
            <div style={{display:"flex", flexDirection:"column", gap: "1em"}}>
                <TextField label="Название категории" variant="standard" fullWidth={true}
                            value={categoryName}
                            onChange={e=>setCategoryName(e.target.value)}/>
            </div>
            <div style={{display:"flex" , justifyContent:"center"}}>
                <Button color={'primary'}
                        variant={'contained'}
                        onClick={()=>onCreateClick()}>
                    Создать
                </Button>
            </div>
        </PepelevPopup>
    );
};

export default CreateCategoryPopup;
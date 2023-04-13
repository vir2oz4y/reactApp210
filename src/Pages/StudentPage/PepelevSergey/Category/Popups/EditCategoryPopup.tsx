import React, {useState} from 'react';
import PepelevPopup, {IPopup} from "../../../../../Components/Pepelev/PepelevPopup/PepelevPopup";
import {Button, TextField} from "@mui/material";
import {Category} from "../model";

type Props = IPopup & {
    onEdit:(newCategory:Category)=>void;
    category:Category
}
const EditCategoryPopup = ({open, onClose, category, onEdit}:Props) => {

    const [categoryEdit, setCategoryEdit] = useState(category)
    const onEditClick = () =>{
        onEdit(categoryEdit);
        onClose();
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
import React, {useState} from 'react';
import BezlepkinaPopup, {IPopup} from "../../../../../Components/Bezlepkina/BezlepkinaPopup/BezlepkinaPopup";
import {Category} from "../models";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";

type Props=IPopup &{
    onEdit:(newCategory:Category)=>void;
    category:Category;
}
const EditCategoryPopApp = ({open, onClose,category,onEdit}:Props) => {
    const [categoryName,setCategoryName]=useState('')

    const [categoryEdit,setCategoryEdit]=useState(category)
    const onEditClick=()=>{
        onEdit({id:Math.random(),name:categoryName});
        onClose();
    }
    return (
        <BezlepkinaPopup
            title={'category create'}
            open={open}
            onClose={() => onClose()}
        >
            <div>
                <TextField
                    label={"название категории"}
                    variant={"standard"}
                    value={categoryEdit.name}
                    onChange={e=>setCategoryEdit(prev=>({...prev, name:e.target.value}))}
                    fullWidth={true}/>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={()=>onEditClick()}

                    >
                        create
                    </Button>
                </div>
            </div>
        </BezlepkinaPopup>
    );
};
export default EditCategoryPopApp;
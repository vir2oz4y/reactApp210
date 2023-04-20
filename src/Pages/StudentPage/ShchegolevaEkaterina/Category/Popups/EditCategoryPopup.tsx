import React, {useState} from 'react';
import ShchegolevaPopup, {IPopup} from "../../../../../Components/Shchegoleva/ShchegolevaPopup/ShchegolevaPopup";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Category } from '../Models';
import { shchegolevaAxios } from '../../ShchegolevaEkaterinaPage';
type Props=IPopup & {
    onEdit:(newCategory:Category)=>void
    category:Category;
}
const EditCategoryPopup = ({open, onClose,category, onEdit}:Props) => {
    const [categoryEdit, setCategoryEdit]=useState(category)

    const onEditClick = () => {
        shchegolevaAxios.patch('https://canstudy.ru/orderapi/category', { item: categoryEdit })
            .then(() => {
            onEdit(categoryEdit);
            })
        
        onClose();
    }
    return (
        <ShchegolevaPopup title={'Category  create'} open={open} onClose={() => onClose()}>
            <div style={{display:'flex', flexDirection:'column', gap:'1em'}} >
                <TextField label="name category" variant="outlined" value={categoryEdit.name} fullWidth={true}
                           onChange={e=>setCategoryEdit(prev=>({...prev,name:e.target.value}))}/>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Button variant="contained" onClick={()=>onEditClick()}>
                        create
                    </Button>
                </div>
            </div>
        </ShchegolevaPopup>
    );
};

export default EditCategoryPopup;
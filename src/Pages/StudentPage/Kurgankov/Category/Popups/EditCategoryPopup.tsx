import React, { useState } from 'react';
import KurgankovPopup, { IPopup } from "../../../../../Components/Kurgankov/KurgankovPopup/KurgankovPopup";
import { Button, TextField } from "@mui/material";
import { Category } from "../models";
import { kurgankovAxios } from "../../KurgankovPage";

type Props = IPopup & {
    onEdit: (newCategory: Category) => void;
    category: Category
}

const EditCategoryPopup = ({ open, onClose, category, onEdit }: Props) => {

    const [categoryEdit, setCategoryEdit] = useState(category)

    const onEditClick = () => {

        kurgankovAxios.patch<{ item: Category }>('https://canstudy.ru/orderapi/category',
            {
                item: {
                    id: category.id,
                    name: category.name,
                }
            })
            .then(res => {
                onEdit(categoryEdit)
                onClose();
            })
    }

    return (
        <KurgankovPopup
            title={'�������� ���������'}
            open={open}
            onClose={() => onClose()}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1em'
                }}
            >
                <TextField
                    label="�������� ���������"
                    variant="standard"
                    fullWidth={true}
                    value={categoryEdit.name}
                    onChange={e =>
                        setCategoryEdit(prev => ({ ...prev, name: e.target.value }))
                    }
                />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={() => onEditClick()}
                    >
                        ��������
                    </Button>
                </div>

            </div>
        </KurgankovPopup>
    );
};

export default EditCategoryPopup;
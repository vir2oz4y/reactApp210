import React, { useState } from 'react';
import ArtamonovPopup, { IPopup } from "../../../../../Components/Artamonov/ArtamonovPopup/ArtamonovPopup";
import { Button, TextField } from "@mui/material";
import { Manufacture } from "../models";
import { artamonovAxios } from "../../ArtamonovPage";
import { Category } from "../../Category/models";

type Props = IPopup & {
    onEdit: (newManufacture: Manufacture) => void;
    Manufacture: Manufacture
}

const EditManufacturePopup = ({ open, onClose, Manufacture, onEdit }: Props) => {

    const [ManufactureEdit, setManufactureEdit] = useState(Manufacture)

    const onEditClick = () => {
        artamonovAxios.patch<{ item: Manufacture }>('https://canstudy.ru/orderapi/manufacturer',
            {
                item: {
                    id: ManufactureEdit.id,
                    name: ManufactureEdit.name,
                    city: ManufactureEdit.city,
                    country: ManufactureEdit.country,
                }
            })
            .then(res => {
                onEdit(ManufactureEdit)
                onClose();
            })
    }

    return (
        <ArtamonovPopup
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
                    label="�������� �������������"
                    variant="standard"
                    fullWidth={true}
                    value={ManufactureEdit.name}
                    onChange={e =>
                        setManufactureEdit(prev => ({ ...prev, name: e.target.value }))
                    }
                />

                <TextField
                    label="������"
                    variant="standard"
                    fullWidth={true}
                    value={ManufactureEdit.country}
                    onChange={e => setManufactureEdit(prev => (
                        { ...prev, country: e.target.value }
                    ))}
                />

                <TextField
                    label="�����"
                    variant="standard"
                    fullWidth={true}
                    value={ManufactureEdit.city}
                    onChange={e => setManufactureEdit(prev => (
                        { ...prev, city: e.target.value }
                    ))}
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
        </ArtamonovPopup>
    );
};

export default EditManufacturePopup;
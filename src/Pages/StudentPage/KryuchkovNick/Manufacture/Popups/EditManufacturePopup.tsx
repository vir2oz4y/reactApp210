import React, {useState} from 'react';
import KryuchkovPopup, {IPopup} from "../../../../../Components/Kryuchkov/KryuchkovPopup/KryuchkovPopup";
import {Button, TextField} from "@mui/material";
import {Manufacture} from "../models";
import {kryuchkovAxios} from "../../KryuchkovNickPage";
import {Category} from "../../Category/models";

type Props = IPopup & {
    onEdit: (newManufacture: Manufacture) => void;
    Manufacture: Manufacture
}

const EditManufacturePopup = ({open, onClose, Manufacture, onEdit}: Props) => {

    const [ManufactureEdit, setManufactureEdit] = useState(Manufacture)

    const onEditClick = () => {
        kryuchkovAxios.patch<{ item:Manufacture }>('https://canstudy.ru/orderapi/manufacturer',
            {
                item:{
                    id:ManufactureEdit.id,
                    name:ManufactureEdit.name,
                    city:ManufactureEdit.city,
                    country:ManufactureEdit.country,
                }
            })
            .then(res => {
                onEdit(ManufactureEdit)
                onClose();
            })
    }

    return (
        <KryuchkovPopup
            title={'Создание категории'}
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
                    label="Название производителя"
                    variant="standard"
                    fullWidth={true}
                    value={ManufactureEdit.name}
                    onChange={e =>
                        setManufactureEdit(prev => ({...prev, name: e.target.value}))
                    }
                />

                <TextField
                    label="Страна"
                    variant="standard"
                    fullWidth={true}
                    value={ManufactureEdit.country}
                    onChange={e => setManufactureEdit(prev => (
                        {...prev, country: e.target.value}
                    ))}
                />

                <TextField
                    label="Город"
                    variant="standard"
                    fullWidth={true}
                    value={ManufactureEdit.city}
                    onChange={e => setManufactureEdit(prev => (
                        {...prev, city: e.target.value}
                    ))}
                />

                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={() => onEditClick()}
                    >
                        Изменить
                    </Button>
                </div>

            </div>
        </KryuchkovPopup>
    );
};

export default EditManufacturePopup;
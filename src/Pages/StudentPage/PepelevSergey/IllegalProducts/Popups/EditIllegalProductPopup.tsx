import React, {useEffect, useState} from 'react';
import PepelevPopup, {IPopup} from "../../../../../Components/Pepelev/PepelevPopup/PepelevPopup";
import {Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {IllegalProduct} from "../model";
import {pepelevAxios} from "../../PepelevSergeyPage";
import {Category} from "../../Category/model";
import {Manufacturer} from "../../Manufacturer/model";

type Props = IPopup & {
    onEdit: (newIllegalProduct: IllegalProduct) => void;
    IllegalProduct: IllegalProduct
}

const EditIllegalProductPopup = ({open, onClose, IllegalProduct:IllegalProductEdit, onEdit}: Props) => {

    const [IllegalProduct, setIllegalProduct] = useState(IllegalProductEdit)

    const onEditClick = () => {

        pepelevAxios.patch<{ item:IllegalProduct }>('https://canstudy.ru/orderapi/IllegalProduct',
            {
                item:{
                    ...IllegalProduct
                }
            })
            .then(res => {
                onEdit(res.data.item)
                onClose();
            })
    }

    const [categoryList, setCategoryList] = useState<Category[]>([])

    const [ManufactureList, setManufactureList] = useState<Manufacturer[]>([])

    const getCategories = () => {
        pepelevAxios.get<{ items: Category[] }>('https://canstudy.ru/orderapi/category/list')
            .then(res => {
                setCategoryList(res.data.items);
            })
    }

    const getManufacturies = () => {
        pepelevAxios.get<{ items: Manufacturer[] }>('https://canstudy.ru/orderapi/Manufacturer/list')
            .then(res => {
                setManufactureList(res.data.items);
            })
    }

    useEffect(() => {
        getCategories();
        getManufacturies();
    }, [])


    return (
        <PepelevPopup
            title={'Изменение клиента'}
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
                    label="Название"
                    variant="standard"
                    fullWidth={true}
                    value={IllegalProduct.name}
                    onChange={e => setIllegalProduct(prev => ({...prev, name: e.target.value}))}
                />

                <TextField
                    label="Описание"
                    variant="standard"
                    fullWidth={true}
                    value={IllegalProduct.description}
                    onChange={e => setIllegalProduct(prev => ({...prev, description: e.target.value}))}
                />


                <TextField
                    label="Цена"
                    variant="standard"
                    fullWidth={true}
                    value={IllegalProduct.cost}
                    onChange={e => setIllegalProduct(prev => ({...prev, cost: e.target.value as any}))}
                />

                <FormControl fullWidth>
                    <InputLabel id="category">Категория</InputLabel>
                    <Select
                        labelId="category"
                        value={IllegalProduct.categoryId?.toString()}
                        label="Категория"
                        onChange={(e) => setIllegalProduct(prev => ({...prev, categoryId: e.target.value as any}))}
                    >
                        {categoryList.map((el, i) =>
                            <MenuItem value={el.id.toString()}>{el.name}</MenuItem>)
                        }

                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="Manufacturer">Производитель</InputLabel>
                    <Select
                        labelId="Manufacturer"
                        value={IllegalProduct.manufacturerId?.toString()}
                        label="Производитель"
                        onChange={(e) => setIllegalProduct(prev => ({...prev, ManufacturerId: e.target.value as any}))}
                    >
                        {ManufactureList.map((el, i) =>
                            <MenuItem value={el.id.toString()}>{el.name}</MenuItem>)
                        }

                    </Select>
                </FormControl>

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
        </PepelevPopup>
    );
};

export default EditIllegalProductPopup;
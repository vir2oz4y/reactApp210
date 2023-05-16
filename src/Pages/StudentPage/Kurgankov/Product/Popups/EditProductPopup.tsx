import React, { useEffect, useState } from 'react';
import KurgankovPopup, { IPopup } from "../../../../../Components/Kurgankov/KurgankovPopup/KurgankovPopup";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Product } from "../models";
import { kurgankovAxios } from "../../KurgankovPage";
import { Category } from "../../Category/models";
import { Manufacture } from "../../Manufacturer/models";

type Props = IPopup & {
    onEdit: (newProduct: Product) => void;
    Product: Product
}

const EditProductPopup = ({ open, onClose, Product: ProductEdit, onEdit }: Props) => {

    const [Product, setProduct] = useState(ProductEdit)

    const onEditClick = () => {

        kurgankovAxios.patch<{ item: Product }>('https://canstudy.ru/orderapi/Product',
            {
                item: {
                    ...Product
                }
            })
            .then(res => {
                onEdit(res.data.item)
                onClose();
            })
    }

    const [categoryList, setCategoryList] = useState<Category[]>([])

    const [manufactureList, setManufactureList] = useState<Manufacture[]>([])

    const getCategories = () => {
        kurgankovAxios.get<{ items: Category[] }>('https://canstudy.ru/orderapi/category/list')
            .then(res => {
                setCategoryList(res.data.items);
            })
    }

    const getManufacturies = () => {
        kurgankovAxios.get<{ items: Manufacture[] }>('https://canstudy.ru/orderapi/manufacturer/list')
            .then(res => {
                setManufactureList(res.data.items);
            })
    }

    useEffect(() => {
        getCategories();
        getManufacturies();
    }, [])


    return (
        <KurgankovPopup
            title={'��������� �������'}
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
                    label="��������"
                    variant="standard"
                    fullWidth={true}
                    value={Product.name}
                    onChange={e => setProduct(prev => ({ ...prev, name: e.target.value }))}
                />

                <TextField
                    label="��������"
                    variant="standard"
                    fullWidth={true}
                    value={Product.description}
                    onChange={e => setProduct(prev => ({ ...prev, description: e.target.value }))}
                />


                <TextField
                    label="����"
                    variant="standard"
                    fullWidth={true}
                    value={Product.cost}
                    onChange={e => setProduct(prev => ({ ...prev, cost: e.target.value as any }))}
                />

                <FormControl fullWidth>
                    <InputLabel id="category">���������</InputLabel>
                    <Select
                        labelId="category"
                        value={Product.categoryId?.toString()}
                        label="���������"
                        onChange={(e) => setProduct(prev => ({ ...prev, categoryId: e.target.value as any }))}
                    >
                        {categoryList.map((el, i) =>
                            <MenuItem value={el.id.toString()}>{el.name}</MenuItem>)
                        }

                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="manufacturer">�������������</InputLabel>
                    <Select
                        labelId="manufacturer"
                        value={Product.manufacturerId?.toString()}
                        label="�������������"
                        onChange={(e) => setProduct(prev => ({ ...prev, manufacturerId: e.target.value as any }))}
                    >
                        {manufactureList.map((el, i) =>
                            <MenuItem value={el.id.toString()}>{el.name}</MenuItem>)
                        }

                    </Select>
                </FormControl>

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

export default EditProductPopup;
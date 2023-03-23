import React, { useState } from 'react';
import { Category } from "./models";

const CategoryPage = () => {

    const [categoryList, setcategoryList] = useState<Category[]>([
        {
            id: 0,
            name:"Категория 1"
        },
        {
            id: 1,
            name:"Категория 2"
        },
    ])

    return (
        <div>
            <h1>Category</h1>

            <div>
                {
                    categoryList.map((el, i) => <div>{el.name}</div>)
                }
            </div>
        </div>
    );
};

export default CategoryPage;
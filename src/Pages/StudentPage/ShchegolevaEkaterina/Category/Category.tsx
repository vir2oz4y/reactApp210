import React, { useState } from 'react';
import { Category } from './Models';

const ShchegolevaCategory = () => {
    const [categoryList, setcategoruList] = useState<Category[]>([
        {
            id: 0,
            name: "Category 1"
        },
        {
            id: 1,
            name: "Category 2"
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

export default ShchegolevaCategory;
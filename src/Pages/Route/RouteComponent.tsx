import React from 'react';
import {Routes, Route, HashRouter,} from "react-router-dom";
import MainPage from "../MainPage";
import StudentsPage from "../StudentsPage";


import TrubnikovTimurPage from "../StudentPage/TrubnikovTimur/TrubnikovTimurPage";
import {default as TrubnikovTest2} from "../StudentPage/TrubnikovTimur/Test2/Test2";
import {default as TrubnikovTest1} from "../StudentPage/TrubnikovTimur/Test1/Test1";

import KiryutinVladPage from "../StudentPage/KiryutinVlad/KiryutinVladPage";
import {default as KiryutinTest1} from "../StudentPage/KiryutinVlad/test1/Test1";
import {default as KiryutinTest2} from "../StudentPage/KiryutinVlad/test2/Test2";

import OndyshevDmitryPage from "../StudentPage/OndyshevDmitry/OndyshevDmitryPage";
import {default as OndyshevTest1} from '../StudentPage/OndyshevDmitry/Test1/Test1';
import {default as OndyshevTest2} from "../StudentPage/OndyshevDmitry/Test2/Test2";

import PepelevSergeyPage from "../StudentPage/PepelevSergey/PepelevSergeyPage";
import {default as PepelevTest1} from "../StudentPage/PepelevSergey/test1/Test1";
import {default as PepelevTest2} from "../StudentPage/PepelevSergey/test2/Test2";

import KryuchkovNickPage from "../StudentPage/KryuchkovNick/KryuchkovNickPage";
import Test1 from "../StudentPage/KryuchkovNick/Test1/Test1";
import Test2 from "../StudentPage/KryuchkovNick/Test2/Test2";

import SakoyanIvanPage from "../StudentPage/SakoyanIvan/SakoyanIvanPage";
import {default as SakoyanTest2} from "../StudentPage/SakoyanIvan/test2/Test2";
import {default as SakoyanTest1} from "../StudentPage/SakoyanIvan/test1/Test1";
import {default as SakoyanCategory} from "../StudentPage/SakoyanIvan/Category/Category";
import {default as SakoyanClient} from "../StudentPage/SakoyanIvan/Client/Client";
import {default as SakoyanManufactur} from "../StudentPage/SakoyanIvan/Manufactur/ManufacturerPage";
import {default as SakoyanOrder} from "../StudentPage/SakoyanIvan/Order/Order";
import {default as SakoyanProduct} from "../StudentPage/SakoyanIvan/Product/Product";
import {default as SakoyanPurchase} from "../StudentPage/SakoyanIvan/Purchase/Purchase";


const RouteComponent = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}>
                    <Route index element={<StudentsPage/>} />


                    <Route path={'Vlados'} element={<KiryutinVladPage/>} >
                        <Route path={'test1'} element={<KiryutinTest1/>} />
                        <Route path={'test2'} element={<KiryutinTest2/>} />
                    </Route>

                    <Route path={'Vanya'} element={<SakoyanIvanPage/>} >
                        <Route path={'test1'} element={<SakoyanTest1/>} />
                        <Route path={'test2'} element={<SakoyanTest2/>} />
                        <Route path={'Category'} element={<SakoyanCategory/>} />
                        <Route path={'Client'} element={<SakoyanClient/>} />
                        <Route path={'Manufactur'} element={<SakoyanManufactur/>} />
                        <Route path={'Order'} element={<SakoyanOrder/>} />
                        <Route path={'Product'} element={<SakoyanProduct/>} />
                        <Route path={'Purchase'} element={<SakoyanPurchase/>} />
                    </Route>


                    <Route path={'ondyshev'} element={<OndyshevDmitryPage></OndyshevDmitryPage>}>
                        <Route path={'test1'} element={<OndyshevTest1/>} />
                        <Route path={'test2'} element={<OndyshevTest2/>} />
                    </Route>

                    <Route path={'Serega'} element={<PepelevSergeyPage/>} >
                       <Route path={'test1'} element={<PepelevTest1/>}/>
                       <Route path={'test2'} element={<PepelevTest2/>}/>
                    </Route>

                    
                    <Route path={'teacher'} element={<KryuchkovNickPage/>} >
                        <Route path={'test1'} element={<Test1/>}/>
                        <Route path={'test2'} element={<Test2/>}/>
                    </Route>

                </Route>
            </Routes>
        </HashRouter>
    );
};

export default RouteComponent;
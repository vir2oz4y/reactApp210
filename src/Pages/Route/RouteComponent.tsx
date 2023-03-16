import React from 'react';
import {
    Routes,
    Route, HashRouter,
} from "react-router-dom";
import MainPage from "../MainPage";
import StudentsPage from "../StudentsPage";
import KryuchkovNickPage from "../StudentPage/KryuchkovNick/KryuchkovNickPage";
import TrubnikovTimurPage from "../StudentPage/TrubnikovTimur/TrubnikovTimurPage";
import Test2 from "../StudentPage/TrubnikovTimur/Test2/Test2";
import Test1 from "../StudentPage/TrubnikovTimur/Test1/Test1";

const RouteComponent = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}>
                    <Route index element={<StudentsPage/>} />

                    <Route path={'teacher'} element={<KryuchkovNickPage/>} />
                    <Route path={'trubnikov'} element={<TrubnikovTimurPage/>} >
                        <Route path={'test1'} element={<Test1/>} />
                        <Route path={'test2'} element={<Test2/>} />
                    </Route>

                </Route>
            </Routes>
        </HashRouter>
    );
};

export default RouteComponent;
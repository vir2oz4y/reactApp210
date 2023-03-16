import React from 'react';
import {
    Routes,
    Route, HashRouter,
} from "react-router-dom";
import MainPage from "../MainPage";
import StudentsPage from "../StudentsPage";
import KryuchkovNickPage from "../StudentPage/KryuchkovNick/KryuchkovNickPage";
import OndyshevDmitryPage from "../StudentPage/OndyshevDmitry/OndyshevDmitryPage";
import Test1 from '../StudentPage/OndyshevDmitry/Test1/Test1';
import Test2 from "../StudentPage/OndyshevDmitry/Test2/Test2";

const RouteComponent = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}>
                    <Route index element={<StudentsPage/>} />

                    <Route path={'teacher'} element={<KryuchkovNickPage/>} />

                    <Route path={'ondyshev'} element={<OndyshevDmitryPage></OndyshevDmitryPage>}>
                        <Route path={'test1'} element={<Test1></Test1>} />
                        <Route path={'test2'} element={<Test2></Test2>} />
                    </Route>

                </Route>
            </Routes>
        </HashRouter>
    );
};

export default RouteComponent;
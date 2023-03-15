import {ThemeProvider} from '@mui/material/styles';
import React from 'react';
import RouteComponent from "./Pages/Route/RouteComponent";
import {theme} from "./Mui/Theme";
import {AppProvider} from "./AppContext/AppContext";


function App() {

    return (
        <div className="App">
            <AppProvider>
                <ThemeProvider theme={theme}>
                    <RouteComponent/>
                </ThemeProvider>
            </AppProvider>
        </div>
    );
}

export default App;

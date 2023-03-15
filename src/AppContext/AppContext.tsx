import React, {createContext, useContext} from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
type ProviderApp = {

};


const init: ProviderApp = {

}

export const AppContext = createContext<ProviderApp>(init);


const useProvideAccount = (): ProviderApp => {

   return {

   }
};

export const AppProvider = ({children}: { children: JSX.Element }) => {
    const value = useProvideAccount();

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);



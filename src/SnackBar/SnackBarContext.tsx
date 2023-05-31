import React, { ReactNode, createContext, useContext } from 'react';

interface ISnackBar {
    id: number, 
    text: string, 
    type: "error" | "success" | "info" | "warning" | "default", 
    durationInSec: number
};

interface ISnackBarsContext {
    snackBars: ISnackBar[];
    addSnackBar: (text: string, type: "error" | "success" | "info" | "warning" | "default", durationInSec: number) => void;
    removeSnackBar: (id: number) => void
}

export const SnackBarContextProvider = createContext<ISnackBarsContext | undefined>(undefined);

const SnackBarContext:React.FC<{children: ReactNode}> = ({children}) => {

    const [snackBars, updateSnackBars] = React.useState<ISnackBar[]>([]);

    return (
        <SnackBarContextProvider.Provider value={{
            snackBars,
            addSnackBar: (text: string, type: "error" | "success" | "info" | "warning" | "default", durationInSec: number) => {
                updateSnackBars([{id: new Date().getTime(), text, type, durationInSec}, ...snackBars]);
            },
            removeSnackBar: (id: number) => {
                updateSnackBars(snackBars.filter(item => item.id !== id));
            }
        }}>
            { children }
        </SnackBarContextProvider.Provider>
    )
}

export default SnackBarContext;
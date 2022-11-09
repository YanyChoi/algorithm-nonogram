import { createContext, useState } from "react";
import { ContextType } from "../types/context";

export const Context = createContext<ContextType | null>(null);

const ContextProvider = ({children}: {children: JSX.Element}) => {
    
    const [tableSize, setTableSize] = useState<number>(15);
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [rowConditions, setRowConditions] = useState<Array<Array<number>>>([]);
    const [columnConditions, setColumnConditions] = useState<Array<Array<number>>>([]);

    return (
        <Context.Provider value={{
            tableSize,
            setTableSize,
            isGameStarted,
            setIsGameStarted,
            isLoading,
            setIsLoading,
            rowConditions,
            setRowConditions,
            columnConditions,
            setColumnConditions
        }}>
            {children}
        </Context.Provider>
        
    )
}

export default ContextProvider;
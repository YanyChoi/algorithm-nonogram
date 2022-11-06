import { createContext, useState } from "react";
import { ContextType } from "../types/context";

export const Context = createContext<ContextType | null>(null);

const ContextProvider = ({children}: {children: JSX.Element}) => {
    
    const [tableSize, setTableSize] = useState<number>(15);
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <Context.Provider value={{
            tableSize,
            setTableSize,
            isGameStarted,
            setIsGameStarted,
            isLoading,
            setIsLoading
        }}>
            {children}
        </Context.Provider>
        
    )
}

export default ContextProvider;
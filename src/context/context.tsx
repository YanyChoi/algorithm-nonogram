import { createContext, useState } from "react";
import { ContextType } from "../types/context";

export const Context = createContext<ContextType | null>(null);

const ContextProvider = ({children}: {children: JSX.Element}) => {
    
    const [tableSize, setTableSize] = useState<number>(15);

    return (
        <Context.Provider value={{
            tableSize,
            setTableSize
        }}>
            {children}
        </Context.Provider>
        
    )
}

export default ContextProvider;
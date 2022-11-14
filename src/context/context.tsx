import { createContext, useState } from "react";
import { ContextType } from "../types/context";

export const Context = createContext<ContextType | null>(null);

const ContextProvider = ({ children }: { children: JSX.Element }) => {
  const [tableSize, setTableSize] = useState<number>(15);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rowConditions, setRowConditions] = useState<Array<Array<number>>>([]);
  const [columnConditions, setColumnConditions] = useState<
    Array<Array<number>>
  >([]);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [table, setTable] = useState<Array<Array<boolean | null>>>([]);
  const [answer, setAnswer] = useState<Array<Array<boolean>>>([]);
  const [finalMessage, setFinalMessage] = useState<String>("");
  const [startTime, setStartTime] = useState<number>(-1);
  const [endTime, setEndTime] = useState<number>(-1);
  return (
    <Context.Provider
      value={{
        tableSize,
        setTableSize,
        isGameStarted,
        setIsGameStarted,
        isLoading,
        setIsLoading,
        rowConditions,
        setRowConditions,
        columnConditions,
        setColumnConditions,
        width,
        setWidth,
        height,
        setHeight,
        mouseDown,
        setMouseDown,
        table,
        setTable,
        answer,
        setAnswer,
        finalMessage,
        setFinalMessage,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

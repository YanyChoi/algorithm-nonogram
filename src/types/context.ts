export type ContextType = {
    tableSize: number
    setTableSize: (value: number) => void
    isGameStarted: boolean
    setIsGameStarted: (value: boolean) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    rowConditions: Array<Array<number>>
    setRowConditions: (value: Array<Array<number>>) => void
    columnConditions: Array<Array<number>>
    setColumnConditions: (value: Array<Array<number>>) => void
    width: number
    setWidth: (value: number) => void
    height: number
    setHeight: (value: number) => void
    mouseDown: boolean
    setMouseDown: (value: boolean) => void
    table: Array<Array<boolean | null>>
    setTable: (value: Array<Array<boolean | null>>) => void
    answer: Array<Array<boolean>>
    setAnswer: (value: Array<Array<boolean>>) => void
    finalMessage: String
    setFinalMessage: (value: String) => void
    startTime: number
    setStartTime: (value: number) => void
    endTime: number
    setEndTime: (value: number) => void
}
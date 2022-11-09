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

}
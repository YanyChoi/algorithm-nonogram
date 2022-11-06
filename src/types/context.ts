export type ContextType = {
    tableSize: number,
    setTableSize: (value: number) => void,
    isGameStarted: boolean,
    setIsGameStarted: (value: boolean) => void
    isLoading: boolean,
    setIsLoading: (value: boolean) => void
}
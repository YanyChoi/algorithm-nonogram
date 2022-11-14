export const setTableBySize = (tableSize: number) => {
    
    const table = [];
    for (let i = 0; i < tableSize; i++) {
        const tableRow = [];
        for (let j = 0; j < tableSize; j++) {
            tableRow.push(null);
        }
        table.push(tableRow);
    }

    return table;
}
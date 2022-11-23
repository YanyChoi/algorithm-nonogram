const getRandomBoolean = () => {
  const random = Math.random();
  if (random > 0.5) {
    return true;
  } else {
    return false;
  }
};

export const createTable = (size: number) => {
  const table = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      const value = getRandomBoolean();
      row.push(value);
    }
    table.push(row);
  }
  return table;
};

export const createProblem = (table: Array<Array<boolean>>) => {
  const size = table.length;
  const columns = [];
  const rows = [];
  let maxWidth = 0;
  let maxHeight = 0;
  for (let i = 0; i < size; i++) {
    const column = [];
    const row = [];
    let rowValue = 0;
    let columnValue = 0;
    for (let j = 0; j < size; j++) {
      if (table[i][j]) {
        rowValue++;
      } else {
        if (rowValue !== 0) {
          row.push(rowValue);
          if (row.length > maxWidth) {
            maxWidth = row.length;
          }
          rowValue = 0;
        }
      }

      if (table[j][i]) {
        columnValue++;
      } else {
        if (columnValue !== 0) {
          column.push(columnValue);
          if (column.length > maxHeight) {
            maxHeight = column.length;
          }
          columnValue = 0;
        }
      }
    }
    if (rowValue !== 0) {
      row.push(rowValue);
    }
    if (columnValue !== 0) {
      column.push(columnValue);
    }

    if (row.length === 0) {
      row.push(0);
    }
    if (column.length === 0) {
      column.push(0);
    }

    rows.push(row);
    if (row.length > maxWidth) {
      maxWidth = row.length;
    }
    columns.push(column);
    if (column.length > maxHeight) {
      maxHeight = column.length;
    }
  }
  const result = {
    columns: columns,
    rows: rows,
    maxHeight: maxHeight,
    maxWidth: maxWidth,
  };
  return result;
};

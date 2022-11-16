const autoSolve = ({rowConditions, columnConditions, table} :{ rowConditions: Array<Array<number>>, columnConditions: Array<Array<number>>, table: Array<Array<boolean | null>> }) => {
  console.log(columnConditions);
  const result = noBaseFunc3({ SIZE: table.length, row: rowConditions, column: columnConditions });
  console.log(result);
  return result;
};

//공백 포함
const sumAll = (arr: Array<number>) => {
  return arr.reduce((a, b) => a + b) + arr.length - 1;
};

/* 나중에 테이블 연결할 필요 있음 */
const noBaseFunc3 = ({ SIZE, row, column }: {SIZE: number, row: Array<Array<number>>, column: Array<Array<number>>}) => {

  const new_table: Array<Array<boolean | null>> = [];
  let i, j, k;
  let remain, offset;

  for (i = 0; i < SIZE; i++) {
    const new_row = [];
    for (j = 0; j < SIZE; j++) {
      new_row.push(null);
    }
    new_table.push(new_row);
  }

  //가로 체크
  for (i = 0; i < row?.length; i++) {
    remain = SIZE - sumAll(row[i]);
    offset = 0; //왼쪽으로 밀어 붙인 뒤 라인 시작 위치

    for (j = 0; j < row[i].length; j++) {
      if (row[i][j] > remain) {
        for (k = offset + remain; k < offset + row[i][j]; k++) {
          new_table[i][k] = true;
        }
      }
      offset += row[i][j] + 1;
    }
  }

  //세로 체크
  for (i = 0; i < column.length; i++) {
    remain = SIZE - sumAll(column[i]);
    offset = 0; //왼쪽으로 밀어 붙인 뒤 라인 시작 위치

    for (j = 0; j < column[i].length; j++) {
      if (column[i][j] > remain) {
        //for (k = i; k < i + (column[i][j] - remain); k++) table[k][i] 색칠;
        for (k = offset + remain; k < offset + column[i][j]; k++) {
          new_table[k][i] = true;
        }
        console.log(
          "세로 " +
            i +
            "번째 열 " +
            (offset + remain) +
            "부터 " +
            (column[i][j] - remain) +
            "개 색칠"
        );
      }
      offset += column[i][j] + 1;
    }
  }

  return new_table;
};

export default autoSolve;

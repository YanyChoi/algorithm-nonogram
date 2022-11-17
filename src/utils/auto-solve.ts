import { tab } from "@testing-library/user-event/dist/tab";
import { maxHeaderSize } from "http";

const autoSolve = ({rowConditions, columnConditions, table} :{ rowConditions: Array<Array<number>>, columnConditions: Array<Array<number>>, table: Array<Array<boolean | null>> }) => {
  // const previous_table:Array<Array<boolean | null>> = [];
  var previous_table = table;
  var current_table;
  var count = 0;

  // 노베이스
  current_table = noBaseFunc3({ SIZE: table.length, row: rowConditions, column: columnConditions }); // 노베이스 상황일 때 채워줌

  do {
    count++;
    copyTable(previous_table, current_table);
    fill(current_table, rowConditions, columnConditions); // X가 아닌값을 정렬했을때 모든 조건과 일치하면 채워줌
    processX(current_table, rowConditions, columnConditions); // X process
    fillAdd(current_table, rowConditions, columnConditions); // 조건 가장 큰 값과 버퍼 가장 큰 값이 서로 같고 하나씩 밖에 없으면 채워줌
    processX(current_table, rowConditions, columnConditions); // X process
    console.log("COUNT : ", count);
  } while(!isEqualTable(current_table, previous_table)); // 둘이 같지 않을 때 까지
  // } while(false);
  return current_table;
};

//공백 포함
const sumAll = (arr: Array<number>) => {
  return arr.reduce((a, b) => a + b) + arr.length - 1;
};
 
const copyTable = (dest: Array<Array<boolean | null>>, src: Array<Array<boolean | null>>) => {
  var h = 0, w = 0;
  var SIZE = dest[0].length;

  for(h = 0 ; h < SIZE ; h++) {
    for(w = 0 ; w < SIZE ; w++) {
      dest[h][w] = src[h][w];
    }
  }
}
const isEqualTable = (arr1 : Array<Array<boolean|null>>, arr2 : Array<Array<boolean|null>>) =>{
  let h, w;
  const SIZE = arr1.length;
  if (arr2.length != SIZE) return false;
  for (h = 0; h < SIZE; h++){
    for (w = 0; w < SIZE; w++){
      if (arr1[h][w] != arr2[h][w]) return false;
    }
  }
  return true;
}
const processX = (table: Array<Array<boolean | null>>, rowConditions: Array<Array<number>>, columnConditions: Array<Array<number>>) => {
  compeleteX(table, rowConditions, columnConditions); // 한줄에서 X만 넣으면 완벽한 상황일때 채워줌
  XCondition4({table: table, row: rowConditions, column: columnConditions}); // 왔다갔다 하면서 체크해서 X
}

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
        /*
        console.log(
          "세로 " +
            i +
            "번째 열 " +
            (offset + remain) +
            "부터 " +
            (column[i][j] - remain) +
            "개 색칠"
        );
        */
      }
      offset += column[i][j] + 1;
    }
  }
  return new_table;
};

function equal(arr1 : Array<number>, arr2 : Array<number>): number {
  var i = 0, SIZE = 0;

  if(arr1.length == arr2.length) { // 크기가 같은지
    SIZE = arr1.length;
    for(i = 0 ; i < SIZE ; i++) { // 하나씩 비교
      if(arr1[i] != arr2[i]) { // element가 틀리면
        return 0; // 종료
      }
      
    }
    return 1;
  }
  return 0;
}

function max(arr : Array<number>): number {
  var i = 0, SIZE = 0;
  var maximum = 0;

  SIZE = arr.length;
  maximum = arr[0];

  for(i = 1; i < SIZE ; i++) {
    if(maximum < arr[i]) {
      maximum = arr[i];
    }
  }
  
  return maximum;
}

function isOnce(arr : Array<number>, num : number): number {
  var i = 0, SIZE = 0, count = 0;

  SIZE = arr.length;

  for(i = 0; i < SIZE ; i++) {
    if(num == arr[i]) {
      count++;
    }
  }
  
  if(count == 0) {
    console.log("Wrong func isOnce");
    return -1;
  } else if(count == 1) {
    return 1;
  } else {
    return 0;
  }
}

const compeleteX = (table: Array<Array<boolean | null>>, row: Array<Array<number>>, column: Array<Array<number>>) => {
  var SIZE = row.length;
  var buffer = [];
  var is_true = 0;
  var h = 0, w = 0;

  // 행 체크(위 -> 아래)
  for (w = 0 ; w < SIZE ; w++) {
    buffer = [];
    is_true = 0; // 값 초기화
    for(h = 0 ; h < SIZE ; h++) {
      if(table[h][w] == true) { // 색칠해져 있으면
        is_true++; // 값 증가
      } else { // 색칠 안되어있음
        if(is_true != 0) { // 만약 색칠 기록이 있으면
          buffer.push(is_true); // 버퍼에 푸쉬
          is_true = 0; // 초기화
        }
      }
    }
    // 마지막꺼는 버퍼에 푸쉬가 안되기 때문에
    if(is_true != 0) {
      buffer.push(is_true); // 버퍼에 푸쉬
    }
    // 버퍼에 아무것도 없으면 0 푸쉬(조건이랑 비교하기 용이)
    if(buffer.length == 0) {
      buffer.push(0);
    }
    // 배열이 같으면 x 적용시킴
    if(equal(column[w], buffer)) {
      for(h = 0 ; h < SIZE ; h++) {
        if(table[h][w] != true) {
          table[h][w] = false;
        }
      }
    }
  }

  // 열 체크(좌 -> 우)
  for (h = 0 ; h < SIZE ; h++) {
    buffer = [];
    is_true = 0; // 값 초기화
    for(w = 0 ; w < SIZE ; w++) {
      if(table[h][w] == true) { // 색칠해져 있으면
        is_true++; // 값 증가
      } else { // 색칠 안되어있음
        if(is_true != 0) { // 만약 색칠 기록이 있으면
          buffer.push(is_true); // 버퍼에 푸쉬
          is_true = 0; // 초기화
        }
      }
    }
    // 마지막꺼는 버퍼에 푸쉬가 안되기 때문에
    if(is_true != 0) {
      buffer.push(is_true); // 버퍼에 푸쉬
    }
    // 버퍼에 아무것도 없으면 0 푸쉬(조건이랑 비교하기 용이)
    if(buffer.length == 0) {
      buffer.push(0);
    }
    // 배열이 같으면 x 적용시킴
    if(equal(row[h], buffer)) {
      for(w = 0 ; w < SIZE ; w++) {
        if(table[h][w] != true) {
          table[h][w] = false;
        }
      }
    }
  }
}

const fill = (table: Array<Array<boolean | null>>, row: Array<Array<number>>, column: Array<Array<number>>) => {
  var SIZE = row.length;
  var buffer = [];
  var is_true = 0;
  var h = 0, w = 0;
  // 행 체크(위 -> 아래)
  for (w = 0 ; w < SIZE ; w++) {
    buffer = [];
    is_true = 0; // 값 초기화
    for(h = 0 ; h < SIZE ; h++) {
      if(table[h][w] != false) { // 색칠해져 있으면
        is_true++; // 값 증가
      } else { // 색칠 안되어있음
        if(is_true != 0) { // 만약 색칠 기록이 있으면
          buffer.push(is_true); // 버퍼에 푸쉬
          is_true = 0; // 초기화
        }
      }
    }
    // 마지막꺼는 버퍼에 푸쉬가 안되기 때문에
    if(is_true != 0) {
      buffer.push(is_true); // 버퍼에 푸쉬
    }
    // 버퍼에 아무것도 없으면 0 푸쉬(조건이랑 비교하기 용이)
    if(buffer.length == 0) {
      buffer.push(0);
    }
    // 배열이 같으면 x 적용시킴
    if(equal(column[w], buffer)) {
      for(h = 0 ; h < SIZE ; h++) {
        if(table[h][w] != false) {
          table[h][w] = true;
        }
      }
    }
  }

  // 열 체크(좌 -> 우)
  for (h = 0 ; h < SIZE ; h++) {
    buffer = [];
    is_true = 0; // 값 초기화
    for(w = 0 ; w < SIZE ; w++) {
      if(table[h][w] != false) { // 색칠해져 있으면
        is_true++; // 값 증가
      } else { // 색칠 안되어있음
        if(is_true != 0) { // 만약 색칠 기록이 있으면
          buffer.push(is_true); // 버퍼에 푸쉬
          is_true = 0; // 초기화
        }
      }
    }
    // 마지막꺼는 버퍼에 푸쉬가 안되기 때문에
    if(is_true != 0) {
      buffer.push(is_true); // 버퍼에 푸쉬
    }
    // 버퍼에 아무것도 없으면 0 푸쉬(조건이랑 비교하기 용이)
    if(buffer.length == 0) {
      buffer.push(0);
    }
    // 배열이 같으면 x 적용시킴
    if(equal(row[h], buffer)) {
      for(w = 0 ; w < SIZE ; w++) {
        if(table[h][w] != false) {
          table[h][w] = true;
        }
      }
    }
  }
}

const fillAdd = (table: Array<Array<boolean | null>>, row: Array<Array<number>>, column: Array<Array<number>>) => {
  var SIZE = row.length;
  var buffer = [];
  var is_true = 0, is_possible = 0;
  var h = 0, w = 0, back = 0;
  // 행 체크(위 -> 아래)
  for (w = 0 ; w < SIZE ; w++) {
    buffer = [];
    is_true = 0; // 값 초기화
    for(h = 0 ; h < SIZE ; h++) {
      if(table[h][w] != false) { // 색칠해져 있으면
        is_true++; // 값 증가
      } else { // 색칠 안되어있음
        if(is_true != 0) { // 만약 색칠 기록이 있으면
          buffer.push(is_true); // 버퍼에 푸쉬
          is_true = 0; // 초기화
        }
      }
    }
    // 마지막꺼는 버퍼에 푸쉬가 안되기 때문에
    if(is_true != 0) {
      buffer.push(is_true); // 버퍼에 푸쉬
    }
    // 버퍼에 아무것도 없으면 0 푸쉬(조건이랑 비교하기 용이)
    if(buffer.length == 0) {
      buffer.push(0);
    }
    // 조건 중 가장 큰 값과 가장 큰 x가 아닌 값이 일치하면 색칠
    if(max(column[w]) == max(buffer) && isOnce(column[w], max(column[w])) && isOnce(buffer, max(buffer))) {
      is_possible = 0; // 초기화
      for(h = 0 ; h < SIZE ; h++) {
        if(table[h][w] != false) { // false가 아니면
          is_possible++; // 값 증가
        } else { // 색칠 안되어있음
            if(is_possible == max(buffer)) { //만약 is_buffer와 max가 같다면
              for(back = h - max(buffer) ; back < h ; back++) { // back은 뒤로 간다음 갯수만큼 색칠
                if(table[back][w] != true) { // 색칠해져있지 않으면
                  table[back][w] = true; // 색칠함
                }
              }
            }
            is_possible = 0; // 초기화
        }
      }
      // 마지막은 처리가 안되므로
      if(is_possible == max(buffer)) { //만약 is_buffer와 max가 같다면
        for(back = h - max(buffer) ; back < h ; back++) { // back은 뒤로 간다음 갯수만큼 색칠
          if(table[back][w] != true) {
            table[back][w] = true;
          }
        }
      }
    }
  }

  // 열 체크(좌 -> 우)
  for (h = 0 ; h < SIZE ; h++) {
    buffer = [];
    is_true = 0; // 값 초기화
    for(w = 0 ; w < SIZE ; w++) {
      if(table[h][w] != false) { // 색칠해져 있으면
        is_true++; // 값 증가
      } else { // 색칠 안되어있음
        if(is_true != 0) { // 만약 색칠 기록이 있으면
          buffer.push(is_true); // 버퍼에 푸쉬
          is_true = 0; // 초기화
        }
      }
    }
    // 마지막꺼는 버퍼에 푸쉬가 안되기 때문에
    if(is_true != 0) {
      buffer.push(is_true); // 버퍼에 푸쉬
    }
    // 버퍼에 아무것도 없으면 0 푸쉬(조건이랑 비교하기 용이)
    if(buffer.length == 0) {
      buffer.push(0);
    }

    // 조건 중 가장 큰 값과 가장 큰 x가 아닌 값이 일치하면 색칠
    if(max(row[h]) == max(buffer) && isOnce(row[h], max(row[h])) && isOnce(buffer, max(buffer))) {
     is_possible = 0; // 초기화 
      for(w = 0 ; w < SIZE ; w++) {
        if(table[h][w] != false) { // false가 아니면
          is_possible++; // 값 증가
        } else { // 색칠 안되어있음
            if(is_possible == max(buffer)) { //만약 is_buffer와 max가 같다면
              for(back = w - max(buffer) ; back < w ; back++) { // back은 뒤로 간다음 갯수만큼 색칠
                if(table[h][back] != true) { // 색칠해져있지 않으면
                  table[h][back] = true; // 색칠함
                }
              }
            }
            is_possible = 0; // 초기화
        }
      }
      // 마지막은 처리가 안되므로
      if(is_possible == max(buffer)) { //만약 is_buffer와 max가 같다면
        for(back = w - max(buffer) ; back < w ; back++) { // back은 뒤로 간다음 갯수만큼 색칠
          if(table[h][back] != true) {
            table[h][back] = true;
          }
        }
      }
    }
  }
}

// 짜는 중
const sequenceX = (table: Array<Array<boolean | null>>, row: Array<Array<number>>, column: Array<Array<number>>) => {
  var SIZE = row.length;
  var buffer = [];
  var is_true = 0, is_possible = 0;
  var h = 0, w = 0, back = 0;
  // 행 체크(위 -> 아래)
  for (w = 0 ; w < SIZE ; w++) {
    buffer = [];
    is_true = 0; // 값 초기화
    for(h = 0 ; h < SIZE ; h++) {
      if(table[h][w] != false) { // 색칠해져 있으면
        is_true++; // 값 증가
      } else { // 색칠 안되어있음
        if(is_true != 0) { // 만약 색칠 기록이 있으면
          buffer.push(is_true); // 버퍼에 푸쉬
          is_true = 0; // 초기화
        }
      }
    }
    // 마지막꺼는 버퍼에 푸쉬가 안되기 때문에
    if(is_true != 0) {
      buffer.push(is_true); // 버퍼에 푸쉬
    }
    // 버퍼에 아무것도 없으면 0 푸쉬(조건이랑 비교하기 용이)
    if(buffer.length == 0) {
      buffer.push(0);
    }
    // 조건 중 가장 큰 값과 가장 큰 x가 아닌 값이 일치하면 색칠
    if(max(column[w]) == max(buffer) && isOnce(column[w], max(column[w])) && isOnce(buffer, max(buffer))) {
      is_possible = 0; // 초기화
      for(h = 0 ; h < SIZE ; h++) {
        if(table[h][w] != false) { // false가 아니면
          is_possible++; // 값 증가
        } else { // 색칠 안되어있음
            if(is_possible == max(buffer)) { //만약 is_buffer와 max가 같다면
              for(back = h - max(buffer) ; back < h ; back++) { // back은 뒤로 간다음 갯수만큼 색칠
                if(table[back][w] != true) { // 색칠해져있지 않으면
                  table[back][w] = true; // 색칠함
                }
              }
            }
            is_possible = 0; // 초기화
        }
      }
      // 마지막은 처리가 안되므로
      if(is_possible == max(buffer)) { //만약 is_buffer와 max가 같다면
        for(back = h - max(buffer) ; back < h ; back++) { // back은 뒤로 간다음 갯수만큼 색칠
          if(table[back][w] != true) {
            table[back][w] = true;
          }
        }
      }
    }
  }

  // 열 체크(좌 -> 우)
  for (h = 0 ; h < SIZE ; h++) {
    buffer = [];
    is_true = 0; // 값 초기화
    for(w = 0 ; w < SIZE ; w++) {
      if(table[h][w] != false) { // 색칠해져 있으면
        is_true++; // 값 증가
      } else { // 색칠 안되어있음
        if(is_true != 0) { // 만약 색칠 기록이 있으면
          buffer.push(is_true); // 버퍼에 푸쉬
          is_true = 0; // 초기화
        }
      }
    }
    // 마지막꺼는 버퍼에 푸쉬가 안되기 때문에
    if(is_true != 0) {
      buffer.push(is_true); // 버퍼에 푸쉬
    }
    // 버퍼에 아무것도 없으면 0 푸쉬(조건이랑 비교하기 용이)
    if(buffer.length == 0) {
      buffer.push(0);
    }

    // 조건 중 가장 큰 값과 가장 큰 x가 아닌 값이 일치하면 색칠
    if(max(row[h]) == max(buffer) && isOnce(row[h], max(row[h])) && isOnce(buffer, max(buffer))) {
     is_possible = 0; // 초기화 
      for(w = 0 ; w < SIZE ; w++) {
        if(table[h][w] != false) { // false가 아니면
          is_possible++; // 값 증가
        } else { // 색칠 안되어있음
            if(is_possible == max(buffer)) { //만약 is_buffer와 max가 같다면
              for(back = w - max(buffer) ; back < w ; back++) { // back은 뒤로 간다음 갯수만큼 색칠
                if(table[h][back] != true) { // 색칠해져있지 않으면
                  table[h][back] = true; // 색칠함
                }
              }
            }
            is_possible = 0; // 초기화
        }
      }
      // 마지막은 처리가 안되므로
      if(is_possible == max(buffer)) { //만약 is_buffer와 max가 같다면
        for(back = w - max(buffer) ; back < w ; back++) { // back은 뒤로 간다음 갯수만큼 색칠
          if(table[h][back] != true) {
            table[h][back] = true;
          }
        }
      }
    }
  }
}
const XCondition4 = ({table, row, column} : {table: Array<Array<boolean|null>>, row: Array<Array<number>>, column: Array<Array<number>>}) =>{
  const SIZE = table.length, INF = 999999;
  let new_table : Array<Array<boolean | null>> = [];
  let i, j;
  let min, max;

  //가로 체크
  for (i = 0; i < SIZE; i++){
    if (row[i].length !== 1) continue;

    min = INF;
    max = -INF;
    for (j = 0; j < SIZE; j++){
      if (table[i][j] === true){
        if (min > j) min = j;
        if (max < j) max = j;
      }
    }
    if (min === INF) continue;

    //내부 색칠
    for (j = min; j <= max; j++){
      table[i][j] = true;
    }

    //닿지 않는 부분 X 표시
    //왼쪽
    for (j = 0; j <= max - row[i][0]; j++){
      table[i][j] = false;
    }
    
    //오른쪽
    for (j = min + row[i][0]; j < SIZE; j++){
      table[i][j] = false;
    }
  }

  
  //세로 체크
  for (i = 0; i < SIZE; i++){
    if (column[i].length !== 1) continue;

    min = INF;
    max = -INF;
    for (j = 0; j < SIZE; j++){
      if (table[j][i] === true){
        if (min > j) min = j;
        if (max < j) max = j;
      }
    }
    if (min === INF) continue;

    //내부 색칠
    for (j = min; j <= max; j++){
        table[j][i] = true;
    }

    //닿지 않는 부분 X 표시
    //위쪽
    for (j = 0; j <= max - column[i][0]; j++){
      table[j][i] = false;
    }
    
    //아래쪽
    for (j = min + column[i][0]; j < SIZE; j++){
      table[j][i] = false;
    }
  }
  

  // //return
  // for (i = 0; i < SIZE; i++){
  //   new_table.push(table[i]);
  // }
};

export default autoSolve;
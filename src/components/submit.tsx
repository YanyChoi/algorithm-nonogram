import { Button, Grid } from "@mui/material";
import { useContext } from "react";
import { Context } from "../context/context";
import { ContextType } from "../types/context";

const SubmitButton = () => {
  const {
    table,
    answer,
    columnConditions,
    rowConditions,
    isGameStarted,
    tableSize,
    setFinalMessage,
    setEndTime,
  } = useContext(Context) as ContextType;

  const onClick = () => {
    if(checkResult(table, rowConditions, columnConditions)) {
      setFinalMessage("correct answer.");
    } else {
      setFinalMessage("Wrong answer. Please try again.");
    }
  };
  return (
    <Button
      disabled={!isGameStarted}
      variant="contained"
      style={{
        marginTop: "30px",
        width: "200px",
        height: "50px",
        fontSize: "20pt",
      }}
      onClick={onClick}
    >
      Submit
    </Button>
  );
};

function checkResult(table: Array<Array<boolean | null>>, row: Array<Array<number>>, column: Array<Array<number>>): number {
  var SIZE = row.length;
  var buffer = [];
  var is_true = 0;
  var h = 0, w = 0;

  // 세로줄 체크
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
    // 배열이 같은지 비교
    if(!equal(column[w], buffer)) {
      return 0;
    }
  }

  // 가로줄 체크
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
    // 배열이 같은지 비교
    if(!equal(row[h], buffer)) {
      return 0;
    }
  }

  // 아무 문제 없으면
  return 1;
}

function equal(arr1 : Array<number>, arr2 : Array<number>): number {
  var i = 0, SIZE = 0;

  if(arr1.length == arr2.length) { // 크기가 같은지
    SIZE = arr1.length;
    for(i = 0 ; i < SIZE ; i++) { // 하나씩 비교
      if(arr1[i] != arr2[i]) { // element가 틀리면
        break; // 종료
      }
      return 1;
    }
  }
  return 0;
}
export default SubmitButton;

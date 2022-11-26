import { Button } from "@mui/material";
import { useContext } from "react";
import { Context } from "../context/context";
import { ContextType } from "../types/context";

const SubmitButton = () => {
  const {
    table,
    columnConditions,
    rowConditions,
    isGameStarted,
    setFinalMessage,
    setEndTime,
  } = useContext(Context) as ContextType;

  const onClick = () => {
    if (checkResult(table, rowConditions, columnConditions)) {
      setFinalMessage("correct answer.");
      setEndTime(new Date().getTime());
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

export const checkResult = (
  table: Array<Array<boolean | null>>,
  row: Array<Array<number>>,
  column: Array<Array<number>>
): boolean => {
  const SIZE = row.length;
  let buffer = [];
  let is_true = 0;
  let h = 0,
    w = 0;

  // 세로줄 체크
  for (w = 0; w < SIZE; w++) {
    buffer = [];
    is_true = 0; // 값 초기화
    for (h = 0; h < SIZE; h++) {
      if (table[h][w] === true) {
        // 색칠해져 있으면
        is_true++; // 값 증가
      } else {
        // 색칠 안되어있음
        if (is_true !== 0) {
          // 만약 색칠 기록이 있으면
          buffer.push(is_true); // 버퍼에 푸쉬
          is_true = 0; // 초기화
        }
      }
    }
    // 마지막꺼는 버퍼에 푸쉬가 안되기 때문에
    if (is_true !== 0) {
      buffer.push(is_true); // 버퍼에 푸쉬
    }
    // 버퍼에 아무것도 없으면 0 푸쉬(조건이랑 비교하기 용이)
    if (buffer.length === 0) {
      buffer.push(0);
    }
    // 배열이 같은지 비교
    if (!equal(column[w], buffer)) {
      return false;
    }
  }

  // 가로줄 체크
  for (h = 0; h < SIZE; h++) {
    buffer = [];
    is_true = 0; // 값 초기화
    for (w = 0; w < SIZE; w++) {
      if (table[h][w] === true) {
        // 색칠해져 있으면
        is_true++; // 값 증가
      } else {
        // 색칠 안되어있음
        if (is_true !== 0) {
          // 만약 색칠 기록이 있으면
          buffer.push(is_true); // 버퍼에 푸쉬
          is_true = 0; // 초기화
        }
      }
    }
    // 마지막꺼는 버퍼에 푸쉬가 안되기 때문에
    if (is_true !== 0) {
      buffer.push(is_true); // 버퍼에 푸쉬
    }
    // 버퍼에 아무것도 없으면 0 푸쉬(조건이랑 비교하기 용이)
    if (buffer.length === 0) {
      buffer.push(0);
    }
    // 배열이 같은지 비교
    if (!equal(row[h], buffer)) {
      return false;
    }
  }

  // 아무 문제 없으면
  return true;
};

const equal = (arr1: Array<number>, arr2: Array<number>): boolean => {
  if (arr1.length === arr2.length) {
    // 크기가 같은지
    const SIZE = arr1.length;
    for (let i = 0; i < SIZE; i++) {
      // 하나씩 비교
      if (arr1[i] !== arr2[i]) {
        // element가 틀리면
        return false;
      }
    }
    return true;
  }
  return false;
};
export default SubmitButton;

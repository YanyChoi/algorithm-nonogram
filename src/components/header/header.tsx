import { Button, Grid, Slider } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../context/context";
import { ContextType } from "../../types/context";
import { createProblem, createTable } from "../../utils/create-problem";
import { setTableBySize } from "../../utils/set-table-by-size";

const Header = () => {
  const {
    tableSize,
    setTableSize,
    isGameStarted,
    setIsGameStarted,
    setIsLoading,
    setRowConditions,
    setColumnConditions,
    setWidth,
    setHeight,
    setAnswer,
    setTable,
    setFinalMessage,
    setStartTime,
  } = useContext(Context) as ContextType;
  return (
    <Grid
      container
      direction="column"
      style={{
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        Automated Nonogram
      </h1>
      {!isGameStarted && (
        <>
          <p>Choose Table Size</p>
          <Slider
            disabled={isGameStarted}
            aria-label="Table Size"
            defaultValue={tableSize}
            valueLabelDisplay="auto"
            step={1}
            min={2}
            max={15}
            onChange={(e, value) => {
              setIsLoading(true);
              const newSize = Array.isArray(value) ? value[0] : value;
              setTableSize(newSize);
              setIsLoading(false);
              setColumnConditions([]);
              setRowConditions([]);
            }}
            style={{
              width: "280px",
              margin: "0 auto",
            }}
          />
        </>
      )}
      <Button
        variant="text"
        onClick={async () => {
          if (!isGameStarted) {
            const newAnswer = createTable(tableSize);
            setAnswer(newAnswer);
            const conditions = createProblem(newAnswer);
            setColumnConditions(conditions.columns);
            setRowConditions(conditions.rows);
            setWidth(
              tableSize >= 10 && window?.innerWidth < 800
                ? conditions.maxWidth * 12
                : conditions.maxWidth * 20
            );
            setHeight(
              tableSize >= 10 && window?.innerWidth < 800
                ? conditions.maxHeight * 14 + 5
                : conditions.maxHeight * 20 + 5
            );
          } else {
            setStartTime(new Date().getTime());
            setFinalMessage("");
            setTable(setTableBySize(tableSize));
            setColumnConditions([]);
            setRowConditions([]);
            setWidth(0);
            setHeight(0);
          }
          setIsGameStarted(!isGameStarted);
        }}
      >
        {isGameStarted ? "Reset" : "Start"}
      </Button>
    </Grid>
  );
};

export default Header;

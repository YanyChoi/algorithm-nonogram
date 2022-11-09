import { Button, Grid, Slider } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../context/context";
import { ContextType } from "../../types/context";

const Header = () => {
  const {
    tableSize,
    setTableSize,
    isGameStarted,
    setIsGameStarted,
    setIsLoading,
    setRowConditions,
    setColumnConditions,
  } = useContext(Context) as ContextType;
  return (
    <Grid
      container
      direction="column"
      style={{
        textAlign: "center",
      }}
    >
      <h1
        style={{
          marginBottom: "50px",
        }}
      >
        Automated Nonogram
      </h1>
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
          width: "300px",
          margin: "0 auto",
        }}
      />
      <Button
        variant="text"
        onClick={() => {
          setIsGameStarted(!isGameStarted);
        }}
      >
        {isGameStarted ? "Reset" : "Start"}
      </Button>
    </Grid>
  );
};

export default Header;

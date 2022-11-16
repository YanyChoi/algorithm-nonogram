import { Button } from "@mui/material";
import { useContext } from "react";
import { Context } from "../context/context";
import { ContextType } from "../types/context";
import autoSolve from "../utils/auto-solve";

const HelpButton = () => {
  const { columnConditions, rowConditions, table, isGameStarted } = useContext(
    Context
  ) as ContextType;
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
      onClick={() => {
        autoSolve({
          column: columnConditions,
          row: rowConditions,
          table: table,
        });
      }}
    >
      Automize
    </Button>
  );
};
export default HelpButton;

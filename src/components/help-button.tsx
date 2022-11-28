import { Button } from "@mui/material";
import { useContext } from "react";
import { Context } from "../context/context";
import { ContextType } from "../types/context";
import autoSolve from "../utils/auto-solve";

const HelpButton = () => {
  const {
    columnConditions,
    rowConditions,
    table,
    isGameStarted,
    tableSize,
    setTable,
  } = useContext(Context) as ContextType;
  return (
    <Button
      disabled={!isGameStarted || tableSize >= 10}
      variant="contained"
      style={{
        marginTop: "30px",
        width: "calc(40vw)",
        fontSize: "20px",
      }}
      onClick={async () => {
        const data = autoSolve({
          columnConditions: columnConditions,
          rowConditions: rowConditions,
          table: table,
        });
        setTable(data);
      }}
    >
      Automize
    </Button>
  );
};
export default HelpButton;

import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context";
import { ContextType } from "../../types/context";

const Block = ({
  onChange,
  x,
  y,
}: {
  onChange: Function;
  x: number;
  y: number;
}) => {
  const display = (type: boolean | null) => {
    if (type) {
      return "O";
    } else if (type === null) {
      return "";
    } else {
      return "X";
    }
  };
  const { isGameStarted, mouseDown, setMouseDown, table } = useContext(
    Context
  ) as ContextType;
  const [changed, setChanged] = useState<boolean>(false);

  useEffect(() => {
    if (!mouseDown) {
      setChanged(false);
    }
  }, [mouseDown]);
  return (
    <Grid
      container
      width={30}
      height={30}
      style={{
        border: "1px solid grey",
        borderRadius: "5px",
        backgroundColor: `${table[x][y] ? "black" : ""}`,
      }}
      onMouseOver={async () => {
        if (isGameStarted && mouseDown && !changed) {
          if (table[x][y]) {
            await onChange(x, y, false);
          } else if (table[x][y] === false) {
            await onChange(x, y, null);
          } else {
            await onChange(x, y, true);
          }
        }
        setChanged(true);
      }}
      onMouseDown={async (e) => {
        e.preventDefault();
        if (isGameStarted) {
          if (table[x][y]) {
            await onChange(x, y, false);
          } else if (table[x][y] === false) {
            await onChange(x, y, null);
          } else {
            await onChange(x, y, true);
          }
        }
        setMouseDown(true);
      }}
      onMouseUp={() => {
        setMouseDown(false);
      }}
    >
      <p
        style={{
          fontSize: "15pt",
          color: `${display(table[x][y]) === "X" ? "red" : "black"}`,
          margin: "0 auto",
          padding: "2px 0px 0px 1px",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none",
        }}
      >
        {display(table[x][y])}
      </p>
    </Grid>
  );
};

export default Block;

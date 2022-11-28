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
  const { isGameStarted, mouseDown, setMouseDown, table, tableSize } =
    useContext(Context) as ContextType;
  const [changed, setChanged] = useState<boolean>(false);
  const [value, setValue] = useState<String>("");
  useEffect(() => {
    if (!mouseDown) {
      setChanged(false);
    }
  }, [mouseDown]);

  useEffect(() => {
    if (table[x][y] === true) {
      setValue("O");
    } else if (table[x][y] === false) {
      setValue("X");
    } else {
      setValue("");
    }
  }, [table]);
  return (
    <Grid
      container
      width={tableSize >= 10 ? 20 : 30}
      height={tableSize >= 10 ? 20 : 30}
      style={{
        border: "1px solid grey",
        borderRadius: "5px",
        backgroundColor: `${value === "O" ? "black" : "white"}`,
      }}
      onMouseOver={async () => {
        if (isGameStarted && mouseDown && !changed) {
          if (value === "O") {
            setValue("X");
            await onChange(x, y, false);
          } else if (value === "X") {
            setValue("");
            await onChange(x, y, null);
          } else {
            setValue("O");
            await onChange(x, y, true);
          }

          setChanged(true);
        }
      }}
      onMouseDown={async (e) => {
        e.preventDefault();
        if (isGameStarted) {
          if (value === "O") {
            await onChange(x, y, false);
            setValue("X");
          } else if (value === "X") {
            setValue("");
            await onChange(x, y, null);
          } else {
            await onChange(x, y, true);
            setValue("O");
          }
        }
        setChanged(true);
        setMouseDown(true);
      }}
      onMouseUp={() => {
        setMouseDown(false);
      }}
    >
      <p
        style={{
          fontSize: tableSize >= 10 ? "10px" : "15pt",
          color: `${value === "X" ? "red" : "black"}`,
          margin: "0 auto",
          padding: "2px 0px 0px 1px",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none",
        }}
      >
        {value}
      </p>
    </Grid>
  );
};

export default Block;

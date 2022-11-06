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
  const { isGameStarted } = useContext(Context) as ContextType;
  const [output, setOutput] = useState<String>("");
  useEffect(() => {
    if (!isGameStarted)
    setOutput("");
  }, [isGameStarted]);
  return (
    <Grid
      container
      width={30}
      height={30}
      style={{
        border: "1px solid black",
        backgroundColor: `${output === "O" ? "black" : ""}`,
      }}
      onClick={async () => {
        if (isGameStarted) {
          if (output === "O") {
            await onChange(x, y, "X");
            setOutput("X");
          } else if (output === "X") {
            await onChange(x, y, "");
            setOutput("");
          } else {
            await onChange(x, y, "O");
            setOutput("O");
          }
        }
      }}
    >
      <p
        style={{
          color: `${output === "X" ? "red" : "black"}`,
          margin: "0 auto",
          paddingTop: "4px",
        }}
      >
        {output === "X" ? output : ""}
      </p>
    </Grid>
  );
};

export default Block;

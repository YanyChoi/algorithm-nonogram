import { Grid, Slider } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../context/context";
import { ContextType } from "../../types/context";

const Header = () => {
  const { tableSize, setTableSize } = useContext(Context) as ContextType;

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
        aria-label="Table Size"
        defaultValue={tableSize}
        valueLabelDisplay="auto"
        step={1}
        min={1}
        max={20}
        onChange={(e, value) => {
          const newSize = Array.isArray(value) ? value[0] : value;
          setTableSize(newSize);
        }}
        style={{
          width: "300px",
          margin: "0 auto",
        }}
      />
    </Grid>
  );
};

export default Header;

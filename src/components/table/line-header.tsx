import { Grid } from "@mui/material";
import { useContext } from "react";
import { Context } from "../../context/context";
import { ContextType } from "../../types/context";

const LineHeader = ({
  direction,
  index,
}: {
  direction: String;
  index: number;
}) => {
  const { columnConditions, rowConditions, width, height } = useContext(
    Context
  ) as ContextType;
  if (direction === "row") {
    return (
      <Grid
        container
        direction="row"
        justifyContent="end"
        width={width}
        height={30}
        border="thick"
        style={{
          borderRadius: "8px",
          backgroundColor: "lightgrey",
          marginRight: "5px",
        }}
      >
        {rowConditions[index]?.map((row) => (
          <p
            style={{
              width: "17px",
              height: "30px",
              fontSize: "12px",
              margin: "0px",
              textAlign: "center",
              paddingTop: "8px",
            }}
          >
            {row}
          </p>
        ))}
      </Grid>
    );
  } else if (direction === "column") {
    return (
      <Grid
        container
        direction="column"
        justifyContent="end"
        width={30}
        height={height}
        style={{
          borderRadius: "8px",
          backgroundColor: "lightgrey",
        }}
      >
        {columnConditions[index]?.map((column) => (
          <p
            style={{
              width: "30px",
              height: "20px",
              fontSize: "12px",
              margin: "0px",
              textAlign: "center",
            }}
          >
            {column}
          </p>
        ))}
      </Grid>
    );
  } else {
    return <></>;
  }
};

export default LineHeader;

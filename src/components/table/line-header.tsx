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
  const { columnConditions, rowConditions, width, height, tableSize } =
    useContext(Context) as ContextType;
  if (direction === "row") {
    return (
      <Grid
        container
        direction="row"
        justifyContent="end"
        width={width}
        height={tableSize >= 10 ? 20 : 30}
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
              width: tableSize >= 10 ? "12px" : "19px",
              height: tableSize >= 10 ? `20px` : `30px`,
              fontSize: tableSize >= 10 ? "10px" : "12px",
              margin: "0px",
              textAlign: "center",
              paddingTop: tableSize >= 10 ? "6px" : "8px",
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
        width={tableSize >= 10 ? 20 : 30}
        height={height}
        style={{
          borderRadius: "8px",
          backgroundColor: "lightgrey",
        }}
      >
        {columnConditions[index]?.map((column) => (
          <p
            style={{
              width: tableSize >= 10 ? `20px` : `30px`,
              height: tableSize >= 10 ? "14px" : "19px",
              fontSize: tableSize >= 10 ? "10px" : "12px",
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

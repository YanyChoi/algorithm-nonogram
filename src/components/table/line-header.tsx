import { Grid } from "@mui/material";

const LineHeader = ({ direction }: { direction: String }) => {
  if (direction === "row") {
    return (
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        width={200}
        height={30}
        style={{
          border: "1 solid black",
        }}
      ></Grid>
    );
  } else if (direction === "column") {
    return (
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        width={30}
        height={200}
        style={{
          border: "1 solid black",
        }}
      ></Grid>
    );
  } else {
    return <></>;
  }
};

export default LineHeader;

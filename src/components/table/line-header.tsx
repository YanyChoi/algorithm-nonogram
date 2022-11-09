import { Grid } from "@mui/material";

const LineHeader = ({ direction }: { direction: String }) => {
  if (direction === "row") {
    return (
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        width={150}
        height={30}
        border="thick"
        style={{
            borderRadius: '8px',
            backgroundColor: 'lightgrey'
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
        height={150}
        style={{
            borderRadius: '8px',
            backgroundColor: 'lightgrey'
        }}
      ></Grid>
    );
  } else {
    return <></>;
  }
};

export default LineHeader;

import Header from "./header";
import { Grid } from "@mui/material";
import Table from "./table/table";

const Wrap = () => {
  return (
    <>
      <Grid container direction="column" justifyContent="center">
        <Header />
        <Table />
      </Grid>
    </>
  );
};

export default Wrap;

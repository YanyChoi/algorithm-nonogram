import { Grid } from "@mui/material";
import { useContext } from "react";
import { Context } from "../context/context";
import { ContextType } from "../types/context";
import Header from "./header/header";
import HelpButton from "./help-button";
import SubmitButton from "./submit";
import Table from "./table/table";

const Wrap = () => {
  const { finalMessage, startTime, endTime } = useContext(
    Context
  ) as ContextType;
  return (
    <>
      <Header />
      <Table />
      <p style={{ textAlign: "center" }}>{`${finalMessage}`}</p>
      <p style={{ textAlign: "center" }}>
        {finalMessage === "correct answer" &&
          `Took ${(endTime - startTime) / 1000}s`}
      </p>
      <Grid container direction="row" justifyContent="center">
        <HelpButton />
        <div style={{ width: "100px" }} />
        <SubmitButton />
      </Grid>
    </>
  );
};

export default Wrap;
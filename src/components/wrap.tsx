import { Grid } from "@mui/material";
import { useContext } from "react";
import { Context } from "../context/context";
import { ContextType } from "../types/context";
import Header from "./header/header";
import HelpButton from "./help-button";
import SubmitButton from "./submit";
import Table from "./table/table";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const Wrap = () => {
  const { finalMessage, startTime, endTime } = useContext(
    Context
  ) as ContextType;
  const { width, height } = useWindowSize();

  return (
    <>
      <Header />
      <Table />
      <p style={{ textAlign: "center" }}>{`${finalMessage}`}</p>
      <p style={{ textAlign: "center" }}>
        {finalMessage === "correct answer." &&
          `Took ${(endTime - startTime) / 1000}s`}
      </p>
      <Grid container direction="row" justifyContent="space-around">
        <HelpButton />
        <SubmitButton />
      </Grid>
      {finalMessage === "correct answer." && (
        <Confetti
          width={width}
          height={height}
          gravity={0.5}
          numberOfPieces={400}
        />
      )}
    </>
  );
};

export default Wrap;

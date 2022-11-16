import { Button, Grid } from "@mui/material";
import { useContext } from "react";
import { Context } from "../context/context";
import { ContextType } from "../types/context";

const SubmitButton = () => {
  const { table, answer, tableSize, setFinalMessage, setEndTime } = useContext(
    Context
  ) as ContextType;

  const onClick = () => {
    let correct = true;
    for (let i = 0; i < tableSize; i++) {
      for (let j = 0; j < tableSize; j++) {
        if (answer[i][j] === true) {
          if (table[i][j] !== true) {
            setFinalMessage("Wrong answer. Please try again.");
            correct = false;
            break;
          }
        }
      }
    }
    if (correct) {
      setFinalMessage("correct answer");
      setEndTime(new Date().getTime());
    }
  };
  return (
    <Button
      variant="contained"
      style={{
        marginTop: "30px",
        width: "200px",
        height: "50px",
        fontSize: "20pt",
      }}
      onClick={onClick}
    >
      Submit
    </Button>
  );
};
export default SubmitButton;

import { Button, Grid } from "@mui/material";
import autoSolve from "../utils/auto-solve";

const HelpButton = () => {
  return (
    <Button
      variant="contained"
      style={{
        marginTop: "30px",
        width: "200px",
        height: "50px",
        fontSize: "20pt",
      }}
      onClick={() => {
        autoSolve();
      }}
    >
      Help!
    </Button>
  );
};
export default HelpButton;

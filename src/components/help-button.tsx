import { Button, Grid } from "@mui/material";

const HelpButton = () => {

    

  return (
    <Grid container justifyContent="center">
      <Button
        variant="contained"
        style={{
          marginTop: "30px",
          width: "200px",
          height: "50px",
          fontSize: "20pt",
        }}
        onClick={() => {

        }}
      >
        Help!
      </Button>
    </Grid>
  );
};
export default HelpButton;

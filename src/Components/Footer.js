import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: theme.palette.background,
  },
}));

export const Footer = () => {
  const classes = useStyles();

  return (
    <>
      <footer className={classes.footer}>
        <Container maxWidth="md">
          <Typography variant="body1">
            React Web App to calculate the PayPal fee which is 2.49 % + €0,35
            for Germany.
          </Typography>
        </Container>
      </footer>
    </>
  );
};

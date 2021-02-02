import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export const NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="€ "
    />
  );
};

export const Calculator = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    amount: "50",
    fee: "1.60",
    receive: "48.41",
    ask: "51.64",
  });

  const feePercent = 2.49; // 2.9
  const plusCents = 0.35; // 0.3

  const handleChange = (event) => {
    const value = Number(event.target.value);
    const fees = value * (feePercent / 100) + plusCents;

    setValues({
      amount: value,
      fee: fees.toFixed(2),
      receive: (value - fees).toFixed(2),
      ask: ((value + plusCents) / (1 - feePercent / 100)).toFixed(2),
    });
  };

  return (
    <div className={classes.root}>
      <TextField
        label="Amount"
        value={values.amount}
        onChange={handleChange}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
      <br />
      <TextField
        label="Fee"
        value={values.fee}
        disabled
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
      <br />
      <TextField
        label="You would receive"
        value={values.receive}
        disabled
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
      <br />
      <TextField
        label="You should ask for"
        value={values.ask}
        disabled
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
      <br />
      <br />
      <br />
      <Typography variant="body1">
        based on a fee of {feePercent}% + €{plusCents}
      </Typography>
    </div>
  );
};

import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography, Slider, Input } from "@material-ui/core";

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

  const [feePercent, setFeePercent] = useState(2.49); // 2.9
  const [plusCents, setPlusCents] = useState(0.35); // 0.3

  const handleAmountChange = (event) => {
    const value = Number(event.target.value);
    const fees = value * (feePercent / 100) + plusCents;

    setValues({
      amount: value,
      fee: fees.toFixed(2),
      receive: (value - fees).toFixed(2),
      ask: ((value + plusCents) / (1 - feePercent / 100)).toFixed(2),
    });
  };

  function valuetext() {
    return `${feePercent}%`;
  }

  return (
    <div className={classes.root}>
      <TextField
        label="Amount"
        value={values.amount}
        onChange={handleAmountChange}
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
      <Typography variant="body1">based on a fee of</Typography>
      <Input
        className={classes.input}
        value={feePercent}
        margin="dense"
        inputProps={{
          step: 0.01,
          min: 0.0,
          max: 5.0,
          type: "number",
        }}
        onChange={(event) => {
          setFeePercent(
            event.target.value === "" ? "" : Number(event.target.value)
          );
        }}
      />
      {"%"}
      <Typography variant="body1">plus</Typography>
      <Input
        className={classes.input}
        value={plusCents}
        margin="dense"
        inputProps={{
          step: 0.01,
          min: 0.0,
          max: 5.0,
          type: "number",
        }}
        onChange={(event) => {
          setPlusCents(
            event.target.value === "" ? "" : Number(event.target.value)
          );
        }}
      />
      {"€"}
      <br />
      <br />
      <Slider
        value={feePercent}
        onChange={(event, newValue) => {
          setFeePercent(newValue);
        }}
        getAriaValueText={valuetext}
        step={0.01}
        min={0.0}
        max={5.0}
        valueLabelDisplay="on"
      />
      <Slider
        value={plusCents}
        onChange={(event, newValue) => {
          setPlusCents(newValue);
        }}
        getAriaValueText={valuetext}
        step={0.01}
        min={0.0}
        max={5.0}
        valueLabelDisplay="on"
      />
    </div>
  );
};

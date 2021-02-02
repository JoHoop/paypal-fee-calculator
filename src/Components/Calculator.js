import React, { useState } from "react";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Typography,
  Slider,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

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
      prefix="€ " // todo {`${currencyLabel} `}
    />
  );
};

export const Calculator = () => {
  const classes = useStyles();

  const [country, setCountry] = useState("Germany");
  const [currencyLabel, setCurrencyLabel] = useState("€");

  const [values, setValues] = useState({
    amount: "50",
    fee: "1.60",
    receive: "48.41",
    ask: "51.64",
  });

  const [feePercent, setFeePercent] = useState(2.49);
  const [plusCents, setPlusCents] = useState(0.35);

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

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    if (event.target.value === "Germany") {
      setFeePercent(2.49);
      setPlusCents(0.35);
      setCurrencyLabel("€");
    } else if (event.target.value === "United States") {
      setFeePercent(2.9);
      setPlusCents(0.3);
      setCurrencyLabel("$");
    }
  };

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
      <FormControl>
        <InputLabel shrink>Country</InputLabel>
        <Select value={country} onChange={handleCountryChange} displayEmpty>
          <MenuItem value={"Germany"}>Germany</MenuItem>
          <MenuItem value={"United States"}>United States</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="body1">based on a fee of</Typography>
      <Input
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
      {currencyLabel}
      <br />
      <br />
      <Slider
        value={feePercent}
        onChange={(event, newValue) => {
          setFeePercent(newValue);
        }}
        step={0.01}
        min={0.0}
        max={5.0}
        valueLabelDisplay="on"
        getAriaValueText={() => `${feePercent}%`}
        valueLabelFormat={() => `${feePercent}%`}
      />
      <Slider
        value={plusCents}
        onChange={(event, newValue) => {
          setPlusCents(newValue);
        }}
        step={0.01}
        min={0.0}
        max={5.0}
        valueLabelDisplay="on"
        getAriaValueText={() => `${plusCents}${currencyLabel}`}
        valueLabelFormat={() => `${plusCents}${currencyLabel}`}
      />
    </div>
  );
};

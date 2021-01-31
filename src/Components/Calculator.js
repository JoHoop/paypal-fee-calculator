import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from "@material-ui/core";

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

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const Calculator = () => {
  const classes = useStyles();
  const [amount, setAmount] = React.useState("50");
  const [fee, setFee] = React.useState("1.75");
  const [ask, setAsk] = React.useState("50");

  const handleChange = (event) => {
    setAmount(event.target.value);
    setFee((event.target.value * 0.029 + 0.3).toFixed(2));
    setAsk((event.target.value * 1.03 + 0.309).toFixed(2));
  };

  return (
    <div className={classes.root}>
      <TextField
        label="Amount"
        value={amount}
        onChange={handleChange}
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
      <br />
      <Typography variant="h6" color="inherit">
        Fee: € {fee}
      </Typography>
      <Typography variant="h6" color="inherit">
        You get € {amount - fee}
      </Typography>
      <Typography variant="h6" color="inherit">
        Ask for € {ask}
      </Typography>
    </div>
  );
};

import React, { useState } from "react";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement
} from "react-stripe-elements";
import TextField from "@material-ui/core/TextField";
import StripeInput from "./StripeInput";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& .MuiTextField-root": {
                margin: theme.spacing(1),
                width: "100%",
                // paddingRight: "10px"
            }
        },
        messageError: {
            color: "red",
            fontSize: "14px",
            margin: theme.spacing(1)
        }
    })
);
function StripeTextField(props: any) {
    const [isEmpty, setEmpty] = useState(true)
    const { InputLabelProps, stripeElement, placeholder, InputProps, isFocus, handleBlur, ...other } = props;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <TextField
                InputLabelProps={!isEmpty ? {
                    ...InputLabelProps,
                    shrink: true
                } : { ...InputLabelProps, }}
                placeholder={''}
                InputProps={{
                    ...InputProps,
                    inputProps: {
                        component: stripeElement
                    },
                    inputComponent: StripeInput
                }}
                onChange={(e: any) => {
                    setEmpty(e.empty)
                }}
                {...other}
                error={isFocus && isEmpty}
                onBlur={handleBlur}
            />
        </div>
    );
}

export function StripeTextFieldNumber(props: any) {
    return (
        <StripeTextField
            // value='asdasdasd'
            label="Credit Card Number"
            stripeElement={CardNumberElement}
            {...props}
        />
    );
}

export function StripeTextFieldExpiry(props: any) {
    return (
        <StripeTextField
            label="MM/YY"
            stripeElement={CardExpiryElement}
            {...props}
        />
    );
}

export function StripeTextFieldCVC(props: any) {
    return (
        <StripeTextField
            label="CVC"
            stripeElement={CardCVCElement}
            {...props}
        />
    );
}

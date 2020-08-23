import React from "react";
import { fade, useTheme } from "@material-ui/core/styles";
import _ from 'lodash';
// import Input from '../input';
import TextField from '@material-ui/core/Input';
export default function StripeInput(props: any) {
    const {
        component: Component,
        inputRef,
        "aria-invalid": ariaInvalid,
        "aria-describedby": ariaDescribeBy,
        defaultValue,
        required,
        onKeyDown,
        onKeyUp,
        readOnly,
        autoComplete,
        autoFocus,
        type,
        name,
        rows,
        ...other
    } = props;
    const theme = useTheme();
    const [mountNode, setMountNode] = React.useState(null);
    return (
        <Component
            onReady={setMountNode}
            {...other}
        />
    );
}

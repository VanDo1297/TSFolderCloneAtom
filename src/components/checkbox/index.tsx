import React, { useState, useEffect } from 'react';
import iconCheck from '../../images/check.png';
import _ from 'lodash';
import './checkbox.scss';
export default function CheckBoxComponent(props: any) {
    const [check, setCheck] = useState([])
    useEffect(() => {
        setCheck(props.check)
    }, [props.check])
    return (
        <div onClick={() => {
            props.handleCheck(
                props.name
            )
        }} className={`d-flex align-items-center justify-content-center ${_.indexOf(check, props.name) !== -1 ? 'checkbox' : 'checkbox-unactive'}`}>
            {
                _.indexOf(check, props.name) !== -1 && (
                    <img src={iconCheck} style={{ width: '15px', height: '12px' }} />
                )
            }
        </div>
    )
}
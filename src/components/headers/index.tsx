import React from "react";
import "./header.scss";
import Button from "react-bootstrap/Button";
export default function Header(props: any) {
  return (
    <div
      className="header"
      style={
        props.opacity ? { background: "#F9F5F1", opacity: props.opacity } : {}
      }
    >
      <div className="icon-header">
        <div className="icon-left"></div>
        <div className="icon-right "></div>
      </div>
      {props.lines && <div className="lines"></div>}
      {props.isShowLoginButton && (
        <div className="ml-auto mr-2 d-flex align-items-center justify-content-center">
          <span className="text-item">PRICING</span>
          <span className="text-item">FITNESS</span>
          <span className="text-item">CONTACT</span>
        </div>
      )}
    </div>
  );
}

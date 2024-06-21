import designs from "./ErrorModal.module.css";
import Card from "./Card";
import Button from "./Button";
import React from "react";
import ReactDOM from "react-dom";
function Backdrop(props) {
  return <div className={designs.backdrop} onClick={props.onConfirm}></div>;
}
function Modal(props) {
  return (
    <Card class={designs.modal}>
      <header className={designs.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={designs.content}>{props.message}</div>
      <footer className={designs.actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
    
  );
}
function ErrorModal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm}></Backdrop>,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <Modal
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        ></Modal>,
        document.getElementById("modal")
      )}
    </>
  );
}

export default ErrorModal;

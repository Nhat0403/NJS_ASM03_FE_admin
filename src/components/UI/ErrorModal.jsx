import classes from "./ErrorModal.module.css";
import React from "react";
import Button from "./Button";

const ErrorModal = (props) => {
  return (
    <div>
      <div className={classes.backdrop} onClick={props.onConfirm} />
      <div className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
          {props.message}
        </div>
        <footer className={classes.actions}>
          {props.error && (<Button onClick={props.onConfirm}>Okay</Button>)}
          {props.showOkay && (<Button onClick={props.onConfirm}>Okay</Button>)}
          {props.showRedirect && (
            <>
              <Button onClick={props.onConfirm}>Not Now</Button>
              <Button onClick={props.goLogin}>Go to Login</Button>
            </>
          )}
          {props.isDelete && (
            <>
              <Button onClick={props.onCancel}>Cancel</Button>
              <Button onClick={props.onDelete}>Delete</Button>
            </>
          )}
        </footer>
      </div>
    </div>
  );
};

export default ErrorModal;

import designs from "./SearchForm.module.css";
import Card from "./UI/Card.js";
import Button from "./UI/Button";
import React, { useState, useRef } from "react";
import ErrorModal from "./UI/ErrorModal";
import axios from "axios";

const  SearchForm=(props)=> {
  const [errorState, setErrorState] = useState();
  const nameHandler = useRef();
 
  function submitHandler(event) {
    event.preventDefault();
    const enteredName = nameHandler.current.value;
    if (enteredName.trim().length === 0) {
      setErrorState({
        title: "Invalid Input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    axios
      .get("http://localhost:4000/data?name="+enteredName)
      .then((res) => {
        if(!res.data.length){
          setErrorState({
            title: "Invalid Customer",
            message: "No deatil for the customer found",
          });
          return
        }
        props.onData(res.data);
      })
      .catch((err) => {
        setErrorState({
          title: "Server Error",
          message: err,
        });
      });
    
    nameHandler.current.value='';
  }
  function errorHandler() {
    setErrorState(null);
  }
  return (
    <>
      {errorState && (
        <ErrorModal
          title={errorState.title}
          message={errorState.message}
          onConfirm={errorHandler}
        />
      )}
      <Card class={designs.input}>
        <form onSubmit={submitHandler}>
          <label>Search Customer</label>
          <input
            type="text"
            ref={nameHandler}
            placeholder="Enter Customer Name"
          ></input>
          <Button type="submit"> Search</Button>
        </form>
      </Card>
    </>
  );
}
export default SearchForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import SelectCustomer from "./Components/SelectCustomer";
import Rewards from "./Components/Rewards";
import { customerReward } from "./utils";
import ErrorModal from "./Components/UI/ErrorModal";

function App() {
  const [items, setItems] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [errorState, setErrorState] = useState();
  const [options, setOptions] = useState();

  //fetch customers txn from json-server
  useEffect(() => {
    axios
      .get("http://localhost:4000/data")
      .then((res) => {
        if (!res.data?.length) {
          setErrorState({
            title: "No Customer",
            message: "No deatil for the customers found",
          });
          return;
        }
        setItems(res.data);
      })
      .catch((err) => {
        setErrorState({
          title: "Server Error",
          message: err,
        });
      });
  }, []);

  //deriving list of customers
  useEffect(() => {
    setOptions(items.map((item) => item.name));
  }, [items]);

  //calculating rewards for selected customer
  let rewards = {};
  if (items.length && selectedCustomer)
    rewards = customerReward(items[selectedCustomer].txn);

  //resetting error modal
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
      <SelectCustomer
        setSelectedCustomer={setSelectedCustomer}
        selectedCustomer={selectedCustomer}
        options={options}
      />
      {items.length && selectedCustomer && (
        <Rewards
          customerName={items[selectedCustomer].name}
          rewards={rewards}
        />
      )}
    </>
  );
}

export default App;

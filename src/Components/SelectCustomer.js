import designs from "./SelectCustomer.module.css";
import Card from "./UI/Card.js";
import React from "react";

/*
Provide a select box with list of user
 */
const SelectCustomer = ({ setSelectedCustomer, options, selectedCustomer }) => {
  return (
    <>
      <Card class={designs.input}>
        <label>Select Customer</label>
        <select
          onChange={(e) => setSelectedCustomer(e.target.value)}
          value={selectedCustomer}
          data-testid={"select"}
        >
          <option value="" disabled hidden>
            Choose a Customer
          </option>
          {options?.map((option, index) => (
            <option key={index} value={index} data-testid={"option"}>
              {option}
            </option>
          ))}
        </select>
      </Card>
    </>
  );
};
export default SelectCustomer;

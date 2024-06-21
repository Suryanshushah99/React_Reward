import SearchForm from "./Components/SearchForm";
import Rewards from "./Components/Rewards";
import { customerReward } from "./utils";
import React, { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  function onData(data) {
    setItems(data);
  }

  let rewards = {};
  if (items.length) rewards = customerReward(items[0].txn);
  return (
    <>
      <SearchForm onData={onData} />
      {items.length && (
        <Rewards customerName={items[0].name} rewards={rewards} />
      )}
    </>
  );
}

export default App;

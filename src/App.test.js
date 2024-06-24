import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import axios from "axios";

jest.mock("axios");

const mockData = [
  {
    name: "Tom",
    txn: [
      {
        date: "6/6/2024",
        amount: "120",
      },
      {
        date: "5/5/2024",
        amount: "10",
      },
      {
        date: "4/4/2024",
        amount: "70",
      },
      {
        date: "4/7/2024",
        amount: "60",
      },
    ],
  },
];

describe("App", () => {
  it("Should render Customer Dropdown with Customer's name", async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: mockData }));
    const { getByTestId, getByText } = render(<App />);
    await waitFor(() => {
      expect(getByText("Select Customer")).toBeInTheDocument();
      expect(getByTestId("select")).toBeInTheDocument();
      expect(getByTestId("option").textContent).toBe("Tom");
    });
  });

  it("Should render Rewards for customer", async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: mockData }));
    const { getByTestId, getAllByTestId, setState } = render(<App />);

    await waitFor(() => {
      const select = getByTestId("select");
      fireEvent.click(select);
      const option = getByTestId("option");
      fireEvent.click(option);
      fireEvent.change(select, { target: { value: "0" } });
      expect(getByTestId("customerName")).toBeInTheDocument();
      expect(getByTestId("customerName").textContent).toBe("Tom");
      expect(getByTestId("totalReward")).toBeInTheDocument();
      expect(getByTestId("totalReward").textContent).toBe("120 pts.");
      expect(getAllByTestId("monthlyReward").length).toBe(3);
    });
  });
});

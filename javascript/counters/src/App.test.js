import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Counter App", () => {
  let getAllByTestId, getByTestId, counterValueElements, incrementElements, decrementElements, sumElement;

  beforeEach(() => {
    const utils = render(<App />);
    getAllByTestId = utils.getAllByTestId;
    getByTestId = utils.getByTestId;
    counterValueElements = getAllByTestId("counter-value");
    incrementElements = getAllByTestId("increment-button");
    decrementElements = getAllByTestId("decrement-button");
    sumElement = getByTestId("sum-element");
  });

  test("should show 3 zeroes and zero sum", () => {
    expect(counterValueElements.length).toEqual(3);
    expect(counterValueElements.at(0).innerHTML).toEqual("0");
    expect(counterValueElements.at(1).innerHTML).toEqual("0");
    expect(counterValueElements.at(2).innerHTML).toEqual("0");
    expect(sumElement.innerHTML).toEqual("Total count: 0");

    // Buttons
    expect(incrementElements.length).toEqual(3);
    expect(decrementElements.length).toEqual(3);
  });

  test("should increment and decrement counters correctly and update sum", () => {
    // Click the first increment button
    fireEvent.click(incrementElements.at(0));
    expect(counterValueElements.at(0).innerHTML).toEqual("1");
    expect(sumElement.innerHTML).toEqual("Total count: 1");

    // Click the second increment button
    fireEvent.click(incrementElements.at(1));
    expect(counterValueElements.at(1).innerHTML).toEqual("1");
    expect(sumElement.innerHTML).toEqual("Total count: 2");

    // Click the third increment button
    fireEvent.click(incrementElements.at(2));
    expect(counterValueElements.at(1).innerHTML).toEqual("1");
    expect(sumElement.innerHTML).toEqual("Total count: 3");
    
    // Click the first decrement button
    fireEvent.click(decrementElements.at(0));
    expect(counterValueElements.at(0).innerHTML).toEqual("0");
    expect(sumElement.innerHTML).toEqual("Total count: 2");

    // Click the second decrement button
    fireEvent.click(decrementElements.at(1));
    expect(counterValueElements.at(1).innerHTML).toEqual("0");
    expect(sumElement.innerHTML).toEqual("Total count: 1");

    // Click the third decrement button
    fireEvent.click(decrementElements.at(2));
    expect(counterValueElements.at(1).innerHTML).toEqual("0");
    expect(sumElement.innerHTML).toEqual("Total count: 0");
  });
});

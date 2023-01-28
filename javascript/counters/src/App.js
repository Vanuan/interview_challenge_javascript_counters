import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";

const data = [
  { id: 1, value: 0 },
  { id: 2, value: 0 },
  { id: 3, value: 0 },
];

const spacing = '20px';
const spacing2 = '60px';
const bold = 600;
const border = '3px';
const headingBgColor = '#00a896';
const totalBgColor = '#44515b';
const incrementBgColor = '#00b440';
const decrementBgColor = '#ff0053';


const AppContainer = styled.div`
  margin: ${spacing};
  font-family: sans-serif;
  font-size: 20pt;
`;

const Heading = styled.div`
  background-color: ${headingBgColor};
  font-size: 2em;
  font-weight: ${bold};
  text-align: center;
  color: white;
  padding: ${spacing};
  border-radius: ${spacing} ${spacing} 0 0;
  border-color: ${totalBgColor};
  border-style: solid;
  border-width: ${border};
`;

const Total = styled.div`
  background-color: ${totalBgColor};
  font-size: 1.2em;
  text-align: center;
  color: white;
  padding: ${spacing};
  border-radius: 0 0 ${spacing} ${spacing};
`;

const CountersContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-style: solid;
  border-color: black;
  border-width: 0 0 0 ${border};
`;

const CounterContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  gap: ${spacing};
  text-align: center;
  padding: ${spacing2} ${spacing};
  border-style: solid;
  border-color: black;
  border-width: 0 ${border} 0 0;
`;

const CounterButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${spacing};
`;

const CounterValue = styled.div`
  font-size: 1em;
`;

const CounterButton = styled.button`
  cursor: pointer;
  padding: 0;
  border: 1px;
  border-radius: 100px;
  font-size: 0.8em;
  font-weight: ${bold};
  font-family: monospace;
  height: 1.2em;
  width: 1.2em;
`;

const IncrementButton = styled(CounterButton)`
  background-color: ${incrementBgColor};
  color: white;
`;

const DecrementButton = styled(CounterButton)`
  background-color: ${decrementBgColor};
  color: white;
`;

const Counter = React.memo((props) => {
  const { initialValue, onChange } = props;
  const [value, setValue] = useState(initialValue);

  const handleIncrement = () => {
    setValue(value + 1);
    onChange(value + 1);
  };

  const handleDecrement = () => {
    setValue(value - 1);
    onChange(value - 1);
  };

  return (
    <CounterContainer>
      <CounterValue data-testid="counter-value">{value}</CounterValue>
      <CounterButtonContainer>
        <IncrementButton data-testid="increment-button" onClick={handleIncrement}>+</IncrementButton>
        <DecrementButton data-testid="decrement-button" onClick={handleDecrement}>&minus;</DecrementButton>
      </CounterButtonContainer>
    </CounterContainer>
  );
});

function App () {
  const [counters, setCounters] = useState(data);
  const sum = useMemo(
    () => counters.reduce((acc, {value}) => acc + value, 0),
    counters.map(c => c.value)
  );

  const handleCounterChange = useCallback((id, value) => {
    setCounters((prevCounters) =>
      prevCounters.map(counter => {
        if (counter.id === id) {
          return { ...counter, value };
        }
        return counter;
      })
    )
  }, []);

  const counterChangeHandlers = useMemo(() => counters.reduce((acc, counter) => {
    acc[counter.id] = (value) => handleCounterChange(counter.id, value);
    return acc;
  }, {}), counters.map((counter) => counter.id));

  return (
    <AppContainer>
      <Heading>Counters challenge</Heading>
      <CountersContainer>
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            initialValue={counter.value}
            onChange={counterChangeHandlers[counter.id]}
          />
        ))}
      </CountersContainer>
      <Total data-testid="sum-element">Total count: {sum}</Total>
    </AppContainer>
  );
};

export default App;

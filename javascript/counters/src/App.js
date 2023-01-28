import React, { useState, useCallback, useMemo } from "react";

const data = [
  { id: 1, value: 0 },
  { id: 2, value: 0 },
  { id: 3, value: 0 },
];

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
    <div>
      <b>{value}</b>
      <div>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
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
    <div>
      {counters.map((counter) => (
        <Counter
          key={counter.id}
          initialValue={counter.value}
          onChange={counterChangeHandlers[counter.id]}
        />
      ))}
      <b>{sum}</b>
    </div>
  );
};

export default App;
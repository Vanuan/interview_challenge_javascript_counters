import React, { useState, useCallback } from "react";

const data = [
  { id: 1, value: 0 },
  { id: 2, value: 0 },
  { id: 3, value: 0 },
];

const Counter = React.memo((props) => {
  const { id, initialValue, onChange } = props;
  const [value, setValue] = useState(initialValue);

  const handleIncrement = () => {
    setValue(value + 1);
    onChange(id, value + 1);
  };

  const handleDecrement = () => {
    setValue(value - 1);
    onChange(id, value - 1);
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

  return (
    <div>
      {counters.map((counter) => (
        <Counter
          key={counter.id}
          id={counter.id}
          initialValue={counter.value}
          onChange={handleCounterChange}
        />
      ))}
    </div>
  );
};

export default App;
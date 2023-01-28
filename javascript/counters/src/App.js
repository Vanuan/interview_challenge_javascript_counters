import React, { useState, useCallback } from "react";

const data = [
  { id: 1, value: 0 },
  { id: 2, value: 0 },
  { id: 3, value: 0 },
];

function Counter(props) {
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
}

function App() {
  const handleCounterChange = useCallback((id, value) => {
    data.find((counter) => counter.id === id).value = value;
    console.log(data);
  }, []);

  return (
    <div>
      {data.map((counter) => (
        <Counter
          key={counter.id}
          id={counter.id}
          initialValue={counter.value}
          onChange={handleCounterChange}
        />
      ))}
    </div>
  );
}

export default App;
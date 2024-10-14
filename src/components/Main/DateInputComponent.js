import React, { useState } from "react";

export default function DateInputComponent({ setDate }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);

    const year = value.slice(0, 4);
    const month = value.slice(5, 7);
    const date = value.slice(8, 10);

    const newArr = { searchDate: year + month + date };
    setDate((prev) => ({ ...prev, ...newArr }));
  };
  return (
    <>
      <input type="date" value={inputValue} onChange={handleInputChange} />
    </>
  );
}

import React, { useState } from "react";
import { Horizontal, Vertical } from "../../styles/CommunalStyle";
import styled from "styled-components";

export default function DateInputComponent({ setDate }) {
  const [inputValue, setInputValue] = useState({
    minDate: "",
    maxDate: "",
  });

  const handleInputChange = (e) => {
    const { value, id } = e.target;

    if (id === "minDate") {
      setInputValue((prev) => ({ ...prev, minDate: value }));
      setDate((prev) => ({ ...prev, minDate: value }));
    } else {
      setInputValue((prev) => ({ ...prev, maxDate: value }));
      setDate((prev) => ({ ...prev, maxDate: value }));
    }
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split("T")[0]; // yyyy-mm-dd 형식으로 반환
  };

  const subDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result.toISOString().split("T")[0]; // yyyy-mm-dd 형식으로 반환
  };
  return (
    <Vertical>
      <DateInput
        type="date"
        id="minDate"
        min={inputValue.maxDate ? subDays(inputValue.maxDate, 7) : null}
        max={inputValue.maxDate}
        value={inputValue.minDate}
        onChange={handleInputChange}
      />
      <span>~</span>
      <DateInput
        type="date"
        id="maxDate"
        min={inputValue.minDate}
        max={inputValue.minDate ? addDays(inputValue.minDate, 7) : null}
        value={inputValue.maxDate}
        onChange={handleInputChange}
      />
    </Vertical>
  );
}

const DateInput = styled.input`
  width: 130px;
`;

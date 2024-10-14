import React, { useState } from "react";
import { Horizontal } from "../../styles/CommunalStyle";
import styled from "styled-components";

export default function DateInputComponent({ setDate }) {
  const [inputValue, setInputValue] = useState({
    minDate: "",
    maxDate: "",
  });

  const handleInputChange = (e) => {
    const { value, id } = e.target;

    const year = value.slice(0, 4);
    const month = value.slice(5, 7);
    const day = value.slice(8, 10);

    if (id === "minDate") {
      setInputValue((prev) => ({ ...prev, minDate: value }));
      setDate((prev) => ({ ...prev, minDate: year + month + day }));
    } else {
      setInputValue((prev) => ({ ...prev, maxDate: value }));
      setDate((prev) => ({ ...prev, maxDate: year + month + day }));
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
    <Horizontal>
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
    </Horizontal>
  );
}

const DateInput = styled.input`
  width: 130px;
`;

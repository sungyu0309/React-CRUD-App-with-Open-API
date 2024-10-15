import React, { useEffect, useState } from "react";
import { DropDownContainer, InputContainer } from "./Style";
import axios from "axios";

export default function SearchInputComponent({ type, setAirport, closeModal }) {
  const [hasText, setHasText] = useState(false);
  // input에 입력값이 존재하는지 확인하는 용도
  const [inputValue, setInputValue] = useState("");
  // 입력 받은 input값을 저장하는 용도
  const [deselectedOptions, setDeselectedOptions] = useState("");
  const [options, setOptions] = useState(deselectedOptions);

  useEffect(() => {
    const url =
      "https://6707c25d8e86a8d9e42ccc3b.mockapi.io/api/airportCodeList";
    axios
      .get(url)
      .then((res) => {
        const seenLabels = new Set();
        const newArr = res.data[0].codes
          .filter((itm) => {
            // 이미 존재하는 label인지 확인
            if (seenLabels.has(itm.kor)) {
              return false; // 중복되면 false
            } else {
              seenLabels.add(itm.kor); // 중복이 아니면 Set에 추가
              return true;
            }
          })
          .map((itm) => ({
            kor: itm.kor,
            code: itm.code,
          }));
        setDeselectedOptions(newArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (inputValue === "") {
      setHasText(false);
      setOptions([]);
    } else {
      setOptions(
        deselectedOptions.filter((option) => {
          return option.kor.includes(inputValue);
        })
      );
    }
  }, [inputValue, deselectedOptions]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setHasText(true);
  };
  // input의 onChange 이벤트 때, 입력값을 inputValue에 저장하고 hasText값 갱신

  const handleDropDownClick = (option) => {
    const newArr =
      type === "depart"
        ? { departAirport: option.kor, departCode: option.code }
        : { arriveAirport: option.kor, arriveCode: option.code };
    setAirport((prev) => ({ ...prev, ...newArr }));
    closeModal();
  };

  // 보여지는 자동완성 값 중 하나를 클릭하면 해당 값이 input에 할당

  const handleDeleteButtonClick = (event) => {
    setInputValue("");
  };
  // 삭제 버튼을 누르면, inputValue를 초기화

  return (
    <div className="autocomplete-wrapper">
      <InputContainer>
        <input onChange={handleInputChange} value={inputValue}></input>
        <div className="delete-button" onClick={handleDeleteButtonClick}>
          &times;
        </div>
      </InputContainer>
      {hasText && (
        <DropDown options={options} handleComboBox={handleDropDownClick} />
      )}
    </div>
  );
}

/* 자동완성 배열(options)에 들어간 값들이 드롭다운으로 보여지는 부분 */
const DropDown = ({ options, handleComboBox, selected }) => {
  return (
    <DropDownContainer>
      {options.map((option, index) => {
        return (
          <li key={index} onClick={() => handleComboBox(option)}>
            {option.kor} ({option.code})
          </li>
        );
      })}
    </DropDownContainer>
  );
};

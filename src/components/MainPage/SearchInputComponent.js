import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

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
    <div className="autocomplete-wrapper" style={{ width: "100%" }}>
      <InputContainer>
        <input onChange={handleInputChange} value={inputValue} />
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
            <span className="code">{option.code}</span>
            <span>{option.kor}</span>
          </li>
        );
      })}
    </DropDownContainer>
  );
};

const boxShadow = "0 4px 6px rgb(32 33 36 / 28%)";

const DropDownContainer = styled.ul`
  max-height: 100px;
  overflow-y: scroll;
  background-color: #ffffff;
  display: block;
  margin-left: auto;
  margin-right: auto;
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  margin-top: 5px;
  border: 1px solid rgb(223, 225, 229);
  /* border-radius: 8px; */
  box-shadow: ${boxShadow};

  z-index: 3;

  > li {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 1rem;
    border-bottom: 0.5px solid gray;
    padding: 10px;
    cursor: pointer;

    &.selected {
      background-color: lightgray;
    }
    > span {
      font-size: 12px;
    }
    > .code {
      font-size: 12px;
      font-weight: 700;
      margin-right: 10px;
    }
  }
`;

export const InputContainer = styled.div`
  margin-top: 30px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  border: 1px solid rgb(223, 225, 229);
  border-radius: 8px;
  z-index: 3;
  box-shadow: 0;

  &:focus-within {
    border: 2px solid rgb(100, 100, 200);
  }

  > input {
    flex: 1 0 0;
    background-color: transparent;
    border: none;
    margin: 0;
    padding: 0;
    outline: none;
    font-size: 16px;
    &:focus {
      outline: rgb(100, 100, 200);
    }
  }

  > div.delete-button {
    cursor: pointer;
  }
`;

import React, { useRef, useState } from "react";
import { Horizontal, Vertical } from "../../styles/CommunalStyle";
import SearchModalComponent from "./SearchModalComponent";
import CalenderComponent from "./CalenderComponent";
import styled from "styled-components";
import CalendarImg from "../../imgs/calender.svg";

export default function DateInputComponent({ currentdate, setCurrentDate }) {
  const [componentPosition, setComponentPosition] = useState({
    ref: "",
    top: "",
    left: "",
  });

  const [showModal, setShowModal] = useState(false);
  const minDateBtnRef = useRef(null);
  const maxDateBtnRef = useRef(null);

  const handleDayPicBtnClick = (type) => {
    const rect = minDateBtnRef.current.getBoundingClientRect();

    const newPosition = {
      ref: type,
      top: rect.top - 30,
      left: rect.left,
    };
    setComponentPosition(newPosition);
    setShowModal(true);
  };

  const changeKorean = (date) => {
    const year = date.substring(0, 4) + "년 ";
    const month = date.substring(5, 7) + "월 ";
    const day = date.substring(8, 10) + "일";
    return year + month + day;
  };

  return (
    <InputsContainer>
      {showModal && (
        <SearchModalComponent
          position={componentPosition}
          closeModal={() => setShowModal(false)}
        >
          <CalenderComponent
            type={componentPosition.ref}
            date={currentdate}
            setDate={setCurrentDate}
            closeModal={() => setShowModal(false)}
          />
        </SearchModalComponent>
      )}
      <DateBtn
        onClick={() => handleDayPicBtnClick("minDateBtn")}
        id="minDateBtn"
        ref={minDateBtnRef}
      >
        {/* <img src={CalendarImg} alt="CalenderImg" /> */}
        {currentdate.minDate
          ? changeKorean(currentdate.minDate)
          : "날짜를 선택해주세요"}
      </DateBtn>
      <span>~</span>
      <DateBtn
        id="maxDateBtn"
        ref={maxDateBtnRef}
        onClick={() => handleDayPicBtnClick("maxDateBtn")}
      >
        {currentdate.maxDate
          ? changeKorean(currentdate.maxDate)
          : "날짜를 선택해주세요"}
      </DateBtn>
    </InputsContainer>
  );
}

const InputsContainer = styled(Horizontal)``;

const DateBtn = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  border-radius: 8px;
  &:hover {
    border: 1px solid rgb(100, 100, 200);
  }
`;

import React, { useRef, useState } from "react";
import { Horizontal } from "../../styles/CommunalStyle";
import SearchModalComponent from "./SearchModalComponent";
import CalenderComponent from "./CalenderComponent";

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

  return (
    <Horizontal>
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
      <button
        onClick={() => handleDayPicBtnClick("minDateBtn")}
        id="minDateBtn"
        ref={minDateBtnRef}
      >
        {currentdate.minDate ? currentdate.minDate : "날짜를 선택해주세요"}
      </button>
      <span>~</span>
      <button
        id="maxDateBtn"
        ref={maxDateBtnRef}
        onClick={() => handleDayPicBtnClick("maxDateBtn")}
      >
        {currentdate.maxDate ? currentdate.maxDate : "날짜를 선택해주세요"}
      </button>
    </Horizontal>
  );
}

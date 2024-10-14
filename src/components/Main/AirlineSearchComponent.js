import React, { useRef, useState } from "react";
import styled from "styled-components";
import SearchModalComponent from "./SearchModalComponent";
import SearchInputComponent from "./SearchInputComponent";

export default function AirlineSearchComponent() {
  const [showModal, setShowModal] = useState(false);
  const [componentPosition, setComponentPosition] = useState("");
  const [airport, setAirport] = useState({
    departAirport: "인천",
    departCode: "ICN",
    arriveAirport: "부산",
    arriveCode: "PUS",
  });

  const departBtnRef = useRef(null);
  const arriveBtnRef = useRef(null);

  const handleLocationBtnClick = (type) => {
    const rect =
      type === "depart"
        ? departBtnRef.current.getBoundingClientRect()
        : arriveBtnRef.current.getBoundingClientRect();

    const newPosition = {
      type: type,
      top: rect.top,
      left: rect.left,
    };
    setComponentPosition(newPosition);
    setShowModal(true);
  };

  const handleChangeBtnClick = () => {
    const newArr = {
      departAirport: airport.arriveAirport,
      departCode: airport.arriveCode,
      arriveAirport: airport.departAirport,
      arriveCode: airport.departCode,
    };
    setAirport(newArr);
  };
  return (
    <>
      {showModal && (
        <SearchModalComponent
          closeModal={() => setShowModal(false)}
          position={componentPosition}
        >
          <SearchInputComponent
            type={componentPosition.type}
            setAirport={setAirport}
            closeModal={() => setShowModal(false)}
          />
        </SearchModalComponent>
      )}
      <LocationContainer>
        <LocationBtn
          id="depart"
          onClick={() => handleLocationBtnClick("depart")}
          ref={departBtnRef}
        >
          {airport.departAirport}
        </LocationBtn>
        <ChangeBtn id="exchange" onClick={handleChangeBtnClick}>
          exchange
        </ChangeBtn>
        <LocationBtn
          id="arrive"
          onClick={() => handleLocationBtnClick("arrive")}
          ref={arriveBtnRef}
        >
          {airport.arriveAirport}
        </LocationBtn>
      </LocationContainer>
    </>
  );
}

const LocationContainer = styled.div`
  border: 1px solid red;
  height: 100px;
`;

const LocationBtn = styled.button`
  position: relative;
  border: none;
  border-radius: 16px;
  background-color: white;
  width: calc((100% - 30px) / 2);
  cursor: pointer;
  &:hover {
    border: 1px solid blue;
  }
`;

const ChangeBtn = styled.button`
  cursor: pointer;
  border: 1px solid blue;
  width: 30px;
`;

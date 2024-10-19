import React, { useRef, useState } from "react";
import styled from "styled-components";
import SearchModalComponent from "./SearchModalComponent";
import SearchInputComponent from "./SearchInputComponent";
import { Horizontal, Vertical } from "../../styles/CommunalStyle";
import DateInputComponent from "./DateInputComponent";
import LoadBtnComponent from "./LoadBtnComponent";

export default function AirlineSearchComponent() {
  const [showModal, setShowModal] = useState(false);
  const [componentPosition, setComponentPosition] = useState("");
  const [airlineInfo, setAirlineInfo] = useState({
    departAirport: "인천",
    departCode: "ICN",
    arriveAirport: "부산/김해",
    arriveCode: "PUS",
    minDate: "",
    maxDate: "",
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
      departAirport: airlineInfo.arriveAirport,
      departCode: airlineInfo.arriveCode,
      arriveAirport: airlineInfo.departAirport,
      arriveCode: airlineInfo.departCode,
    };
    setAirlineInfo((prev) => ({ ...prev, ...newArr }));
  };
  return (
    <Horizontal style={{ marginTop: "30px", justifyContent: "center" }}>
      {showModal && (
        <SearchModalComponent
          closeModal={() => setShowModal(false)}
          position={componentPosition}
        >
          <SearchInputComponent
            type={componentPosition.type}
            setAirport={setAirlineInfo}
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
          <Vertical>
            <span className="departCode">{airlineInfo.departCode}</span>
            <span>{airlineInfo.departAirport}</span>
          </Vertical>
        </LocationBtn>
        <ChangeBtn id="exchange" onClick={handleChangeBtnClick}>
          <i className="fa fa-exchange" />
        </ChangeBtn>
        <LocationBtn
          id="arrive"
          onClick={() => handleLocationBtnClick("arrive")}
          ref={arriveBtnRef}
        >
          <Vertical>
            <span className="departCode">{airlineInfo.arriveCode}</span>
            <span>{airlineInfo.arriveAirport}</span>
          </Vertical>
        </LocationBtn>
      </LocationContainer>
      <DateContainer>
        <p>출발일자 선택</p>
        <DateInputComponent setDate={setAirlineInfo} />
      </DateContainer>
      <LoadBtnContainer>
        <LoadBtnComponent airlineInfo={airlineInfo} />
      </LoadBtnContainer>
    </Horizontal>
  );
}

const LocationContainer = styled(Horizontal)`
  width: 30%;
  border: 1px solid red;
  height: 100px;
  justify-content: center;
`;

const LocationBtn = styled.button`
  padding: 5px 0;
  position: relative;
  border: none;
  border-radius: 0.2rem;
  background-color: white;
  width: calc((100% - 50px) / 2);
  cursor: pointer;
  &:hover {
    border: 1px solid rgb(100, 100, 200);
  }

  > div {
    > .departCode {
      font-weight: 800;
      font-size: 23px;
    }
  }
`;

const ChangeBtn = styled.button`
  cursor: pointer;
  border: 0.5px solid gray;
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  &:hover {
    border: 1px solid rgb(100, 100, 200);
  }
`;

const DateContainer = styled.div`
  width: 40%;
  border: 1px solid blue;
  height: 100px;
`;

const LoadBtnContainer = styled.div`
  width: 20%;
  height: 100px;
  border: 1px solid green;
`;

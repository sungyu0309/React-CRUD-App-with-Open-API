import React, { useRef, useState } from "react";
import styled from "styled-components";
import SearchModalComponent from "./SearchModalComponent";
import SearchInputComponent from "./SearchInputComponent";
import {
  Horizontal,
  NoCenterVertical,
  Vertical,
} from "../../styles/CommunalStyle";
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

  const handleResetBtnClick = () => {
    setAirlineInfo((prev) => ({
      ...prev,
      minDate: "",
      maxDate: "",
    }));
  };
  return (
    <Wrapper>
      <Horizontal style={{ justifyContent: "center" }}>
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
          <Horizontal
            style={{ justifyContent: "flex-start", marginBottom: "5px" }}
          >
            <p>출발일</p>
            <button onClick={handleResetBtnClick} id="reset">
              <i className="fa fa-refresh" />
            </button>
          </Horizontal>
          <DateInputComponent
            currentdate={airlineInfo}
            setCurrentDate={setAirlineInfo}
          />
        </DateContainer>
        <LoadBtnContainer>
          <LoadBtnComponent airlineInfo={airlineInfo} />
        </LoadBtnContainer>
      </Horizontal>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 90%;
  margin-top: 30px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.4);
`;

const LocationContainer = styled(Horizontal)`
  width: 30%;
  height: 100px;
  justify-content: center;
`;

const LocationBtn = styled.button`
  padding: 5px 0;
  position: relative;
  border: none;
  border-radius: 0.2rem;
  background-color: rgba(255, 255, 255, 0.6);
  width: calc((100% - 50px) / 2);
  cursor: pointer;

  &:hover {
    border: 1.5px solid #e99953; /* 진한 주황색 */
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
  background-color: rgba(255, 255, 255, 0.6);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  &:hover {
    border: 1px solid #e99953;
  }
`;

const DateContainer = styled(NoCenterVertical)`
  width: 40%;
  padding: 0 20px;
  height: 100px;

  > div {
    > p {
      margin: 0;
      color: black;
      background-color: rgba(255, 255, 255, 0.6);
      padding: 3px 10px;
      margin-right: 20px;
    }

    > span {
      font-size: 28px;
    }

    > #minDateBtn,
    #maxDateBtn {
      border: none;
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.6);
      padding: 5px;
      border-radius: 4px;
      border: 1px solid transparent;
      min-width: 160px;

      &:hover {
        border: 1px solid #e99953;
      }

      > i {
        font-size: 16px;
      }
    }

    #reset {
      font-size: 16px;
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.6);
      padding: 2px;
      border-radius: 4px;
      border: 1px solid transparent;
    }
  }
`;

const LoadBtnContainer = styled.div`
  width: 20%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

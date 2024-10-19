import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { searchedAirlineState } from "../../store/atom";
import { Horizontal, Vertical } from "../../styles/CommunalStyle";
import styled from "styled-components";
import ModalComponent from "./ModalComponent";
import MakeTripComponent from "./MakeTripComponent";
import Arrow from "../../imgs/arrow.svg";
import AirportImg from "../../imgs/airport.svg";
import CalenderImg from "../../imgs/calender.svg";

export default function AirlineListsComponent() {
  const searchedAirline = useRecoilValue(searchedAirlineState);
  const [showModal, setShowModal] = useState(false);

  const getRandomNum = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const handleMakeBtnClick = () => {
    setShowModal(true);
  };

  const changeTime = (time) => {
    const stringTime = time.toString();
    const hour = stringTime.substring(0, 2);
    const minute = stringTime.substring(2, 4);
    return hour + ":" + minute;
  };

  const changeKorean = (date) => {
    const month = date.substring(4, 6) + "월 ";
    const day = date.substring(6, 8) + "일";
    return month + day;
  };

  return Array.isArray(searchedAirline) ? (
    <>
      {showModal && (
        <ModalComponent closeModal={() => setShowModal(false)}>
          <MakeTripComponent />
        </ModalComponent>
      )}
      <AllListContainer>
        <Vertical style={{ width: "95%" }}>
          {searchedAirline.map((itm) =>
            itm.domesticStartTime ? (
              <ListContainer
                key={
                  itm.domesticNum +
                  itm.date +
                  itm.domesticStartTime +
                  itm.airlineKorean +
                  getRandomNum()
                }
              >
                <Horizontal style={{ position: "relative" }}>
                  <div className="airlineKoreanContainer">
                    <img
                      src={AirportImg}
                      alt="AirportImg"
                      className="AirportImg"
                    />
                    <span>{itm.airlineKorean}</span>
                  </div>
                  <div className="dateContainer">
                    <img
                      src={CalenderImg}
                      alt="CalenderImg"
                      className="CalenderImg"
                    />
                    <span>{changeKorean(itm.date)}</span>
                  </div>
                  <Vertical>
                    <span className="time">
                      {changeTime(itm.domesticStartTime)}
                    </span>
                    <span className="code">{itm.departCode}</span>
                  </Vertical>
                  <img src={Arrow} alt="Arrow" className="arrow" />
                  <Vertical>
                    <span className="time">
                      {changeTime(itm.domesticArrivalTime)}
                    </span>
                    <span className="code">{itm.arriveCode}</span>
                  </Vertical>
                </Horizontal>
                <button onClick={handleMakeBtnClick}>여행 만들기</button>
              </ListContainer>
            ) : (
              <ListContainer
                key={
                  itm.internationalNum +
                  itm.date +
                  itm.internationalTime +
                  itm.airlineKorean +
                  getRandomNum()
                }
              >
                <Horizontal style={{ position: "relative" }}>
                  <div className="airlineKoreanContainer">
                    <img
                      src={AirportImg}
                      alt="AirportImg"
                      className="AirportImg"
                    />
                    <span>{itm.airlineKorean}</span>
                  </div>
                  <div className="dateContainer">
                    <img
                      src={CalenderImg}
                      alt="CalenderImg"
                      className="CalenderImg"
                    />
                    <span>{changeKorean(itm.date)}</span>
                  </div>
                  <Vertical>
                    <span className="time">
                      {changeTime(itm.internationalTime)}
                    </span>
                    <span className="code">{itm.departCode}</span>
                  </Vertical>
                  <img src={Arrow} alt="Arrow" className="arrow" />
                  <Vertical>
                    <span className="time">TBC</span>
                    <span className="code">{itm.arriveCode}</span>
                  </Vertical>
                </Horizontal>
                <MakeTripBtn onClick={handleMakeBtnClick}>
                  여행 만들기
                </MakeTripBtn>
              </ListContainer>
            )
          )}
        </Vertical>
      </AllListContainer>
    </>
  ) : (
    <div>항공편이 존재하지 않습니다</div>
  );
}

const AllListContainer = styled.div`
  width: 90%;
  margin-top: 20px;
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListContainer = styled(Horizontal)`
  /* box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1); */
  margin: 20px;
  border: 1px solid black;
  height: 80px;
  padding: 20px;
  border-radius: 16px;

  .time {
    font-size: 25px;
  }

  .code {
    font-size: 14px;
    color: gray;
  }

  .arrow {
    width: 100px;
  }

  .airlineKoreanContainer {
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    > span {
      color: rgb(100, 100, 200);
      font-size: 12px;
    }
    > img {
      width: 20px;
      margin-right: 5px;
    }
  }

  .dateContainer {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    > span {
      color: rgb(100, 100, 200);
      font-size: 12px;
    }
    > img {
      width: 20px;
      margin-right: 5px;
    }
  }
`;

const MakeTripBtn = styled.button`
  width: 120px;
  font-size: 16px;
  line-height: 30px;
  border-radius: 8px;
  background-color: rgb(100, 100, 200);
  color: white;
  border: 1px solid rgb(100, 100, 200);
`;

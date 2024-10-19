import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { searchedAirlineState } from "../../store/atom";
import { Horizontal, Vertical } from "../../styles/CommunalStyle";
import styled from "styled-components";
import ModalComponent from "./ModalComponent";
import MakeTripComponent from "./MakeTripComponent";

export default function AirlineListsComponent() {
  const searchedAirline = useRecoilValue(searchedAirlineState);
  const [showModal, setShowModal] = useState(false);

  const getRandomNum = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const handleMakeBtnClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    console.log(searchedAirline);
  }, [searchedAirline]);

  return Array.isArray(searchedAirline) ? (
    <>
      {showModal && (
        <ModalComponent closeModal={() => setShowModal(false)}>
          <MakeTripComponent />
        </ModalComponent>
      )}
      <AllListContainer>
        <Vertical>
          {searchedAirline.map((itm) =>
            itm.domesticStartTime ? (
              <ListContainer
                key={
                  itm.domesticNum +
                  itm.date +
                  itm.domesticStartTime +
                  getRandomNum()
                }
              >
                {itm.airlineKorean} : 출발시간 - {itm.domesticStartTime},
                도착시간 -{itm.domesticArrivalTime}
                <button onClick={handleMakeBtnClick}>여행 만들기</button>
              </ListContainer>
            ) : (
              <ListContainer
                key={
                  itm.internationalNum +
                  itm.date +
                  itm.internationalTime +
                  getRandomNum()
                }
              >
                {itm.airlineKorean} : 출발시간 - {itm.internationalTime}, 도착지
                -{itm.arrivalcity}
                <button onClick={handleMakeBtnClick}>여행 만들기</button>
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
  border: 2px solid red;
  width: 90%;
  margin-top: 20px;
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ListContainer = styled(Horizontal)`
  border: 1px solid green;
`;

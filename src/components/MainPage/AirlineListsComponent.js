import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { searchedAirlineState } from "../../store/atom";
import { Horizontal, Vertical } from "../../styles/CommunalStyle";
import styled from "styled-components";

export default function AirlineListsComponent() {
  const searchedAirline = useRecoilValue(searchedAirlineState);

  const getRandomNum = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  useEffect(() => {
    console.log(searchedAirline);
  }, [searchedAirline]);

  return Array.isArray(searchedAirline) ? (
    <AllListContainer>
      <Vertical>
        {searchedAirline.map((itm) =>
          itm.domesticStartTime ? (
            <Horizontal
              key={
                itm.domesticNum +
                itm.date +
                itm.domesticStartTime +
                getRandomNum()
              }
            >
              {itm.airlineKorean} : 출발시간 - {itm.domesticStartTime}, 도착시간
              -{itm.domesticArrivalTime}
            </Horizontal>
          ) : (
            <Horizontal
              key={
                itm.internationalNum +
                itm.date +
                itm.internationalTime +
                getRandomNum()
              }
            >
              {itm.airlineKorean} : 출발시간 - {itm.internationalTime}, 도착지 -
              {itm.arrivalcity}
            </Horizontal>
          )
        )}
      </Vertical>
    </AllListContainer>
  ) : (
    <div>항공편이 존재하지 않습니다</div>
  );
}

const AllListContainer = styled.div`
  border: 2px solid red;
  width: 90%;
  margin-top: 20px;
  height: 300px;
  overflow-y: scroll;
`;

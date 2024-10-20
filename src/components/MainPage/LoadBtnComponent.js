import React from "react";
import { getDomesticAirline, getInternationalAirline } from "../../api/api";
import { useSetRecoilState } from "recoil";
import { searchedAirlineState } from "../../store/atom";
import styled from "styled-components";

export default function LoadBtnComponent({ airlineInfo }) {
  const setSearchedAirline = useSetRecoilState(searchedAirlineState);

  const isHaveNullValue = (info) => {
    return info.arriveAirport === "" ||
      info.departAirport === "" ||
      info.minDate === "" ||
      info.maxDate === ""
      ? true
      : false;
  };

  const areBothDomesticAirports = (info) => {
    return domesticAiportCodes.includes(info.arriveCode) &&
      domesticAiportCodes.includes(info.departCode)
      ? true
      : false;
  };

  const getAirlines = async (date) => {
    const newDate = date.slice(0, 4) + date.slice(5, 7) + date.slice(8, 10);

    if (areBothDomesticAirports(airlineInfo)) {
      let pageNo = 1;

      while (true) {
        const response = await getDomesticAirline(pageNo, newDate, airlineInfo);
        if (response === "트래픽초과") {
          alert("일일 트래픽을 초과했습니다. 담당자에게 문의하세요");
          break;
        }

        if (Array.isArray(response)) {
          const newArr = response.map(({ totalCount, ...rest }) => ({
            ...rest,
            date: newDate,
            arriveCode: airlineInfo.arriveCode,
            departCode: airlineInfo.departCode,
          }));
          setSearchedAirline((prev) => [...prev, ...newArr]);
        } else if (typeof response === "object") {
          const { totalCount, ...newArr } = response;
          const arr = {
            arriveCode: airlineInfo.arriveCode,
            departCode: airlineInfo.departCode,
            ...newArr,
          };
          setSearchedAirline((prev) => [...prev, arr]);
        }

        if (response && response[0]?.totalCount - pageNo * 10 < 0) break;
        pageNo++;
      }
    } else {
      let pageNo = 1;

      while (pageNo !== 4) {
        const response = await getInternationalAirline(
          pageNo,
          newDate,
          airlineInfo
        );

        if (response === "트래픽초과") {
          alert("일일 트래픽을 초과했습니다. 담당자에게 문의 주세요");
          break;
        }
        if (Array.isArray(response)) {
          const newArr = response.map(({ totalCount, ...rest }) => ({
            ...rest,
            date: newDate,
            arriveCode: airlineInfo.arriveCode,
            departCode: airlineInfo.departCode,
          }));
          setSearchedAirline((prev) => [...prev, ...newArr]);
        } else if (typeof response === "object") {
          const { totalCount, ...newArr } = response;
          const arr = {
            arriveCode: airlineInfo.arriveCode,
            departCode: airlineInfo.departCode,
            ...newArr,
          };
          setSearchedAirline((prev) => [...prev, arr]);
        }

        if (response && response[0]?.totalCount - pageNo * 10 < 0) break;
        pageNo++;
      }
    }
  };

  const handleBtnClick = async () => {
    if (isHaveNullValue(airlineInfo)) alert("날짜를 입력해주세요");
    setSearchedAirline([]);

    let minDate = new Date(airlineInfo.minDate);
    let maxDate = new Date(airlineInfo.maxDate);

    while (minDate.getDate() <= maxDate.getDate()) {
      minDate = minDate.toISOString().split("T")[0];
      await getAirlines(minDate);
      minDate = new Date(minDate);
      minDate.setDate(minDate.getDate() + 1);
    }
  };
  return (
    <>
      <LoadBtn onClick={handleBtnClick}>항공편 검색</LoadBtn>
    </>
  );
}

const LoadBtn = styled.button`
  background-color: rgb(100, 100, 200);
  color: white;
  border: 1px solid rgb(100, 100, 200);
  border-radius: 4px;
  width: 130px;
  height: 60px;
  font-size: 20px;
  cursor: pointer;
`;

const domesticAiportCodes = [
  "GMP", // 김포
  "WJU", // 원주
  "YNY", // 양양
  "CJJ", // 청주
  "KUV", // 군산
  "TAE", // 대구
  "KPO", // 포항/경주
  "MWX", // 무안
  "KWJ", // 광주
  "RSU", // 여수
  "HIN", // 진주/사천
  "PUS", // 부산
  "USN", // 울산
  "CJU", // 제주
];

import React from "react";
import { getDomesticAirline, getInternationalAirline } from "../../api/api";

export default function LoadBtnComponent({ airlineInfo }) {
  const isHaveNullValue = (info) => {
    if (
      info.arriveAirport === "" ||
      info.departAirport === "" ||
      info.searchDate === ""
    )
      return true;

    return false;
  };

  const handleBtnClick = async () => {
    if (isHaveNullValue(airlineInfo)) alert("날짜를 입력해주세요");

    if (
      domesticAiportCodes.includes(airlineInfo.arriveCode) &&
      domesticAiportCodes.includes(airlineInfo.departCode)
    ) {
      const response = await getDomesticAirline(1, airlineInfo);
      console.log(response);
    } else {
      const response = await getInternationalAirline(1, airlineInfo);
      console.log(response);
    }
  };
  return (
    <>
      <button onClick={handleBtnClick}>검색하기</button>
    </>
  );
}

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

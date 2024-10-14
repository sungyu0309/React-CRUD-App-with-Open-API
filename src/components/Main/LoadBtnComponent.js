import React from "react";
import { getDomesticAirline, getInternationalAirline } from "../../api/api";

export default function LoadBtnComponent({ airlineInfo }) {
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
        console.log(response); // 응답 페이지네이션 필요
        if (response[0].totalCount - pageNo * 10 < 10) break;
        pageNo++;
      }
    } else {
      let pageNo = 1;

      while (true) {
        const response = await getInternationalAirline(
          pageNo,
          newDate,
          airlineInfo
        );
        console.log(response); // 응답 페이지네이션 필요
        if (response[0].totalCount - pageNo * 10 < 10) break;
        pageNo++;
      }
    }
  };

  const handleBtnClick = () => {
    if (isHaveNullValue(airlineInfo)) alert("날짜를 입력해주세요");

    let minDate = new Date(airlineInfo.minDate);
    let maxDate = new Date(airlineInfo.maxDate);

    while (minDate.getDate() <= maxDate.getDate()) {
      minDate = minDate.toISOString().split("T")[0];
      getAirlines(minDate);
      minDate = new Date(minDate);
      minDate.setDate(minDate.getDate() + 1);
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

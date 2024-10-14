import React from "react";

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

  const handleBtnClick = () => {
    if (isHaveNullValue(airlineInfo)) alert("날짜를 입력해주세요");
  };
  return (
    <>
      <button onClick={handleBtnClick}>검색하기</button>
    </>
  );
}

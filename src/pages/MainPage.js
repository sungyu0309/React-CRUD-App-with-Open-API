import React from "react";
import AirlineSearchComponent from "../components/MainPage/AirlineSearchComponent";
import AirlineListsComponent from "../components/MainPage/AirlineListsComponent";
import { Vertical } from "../styles/CommunalStyle";
import { Link } from "react-router-dom";
import BackImg from "../imgs/backImg.png";
import styled from "styled-components";
import Header from "../components/MainPage/Header";

export default function MainPage() {
  return (
    <Wrapper back={BackImg}>
      <Header />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/mypage">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>
            Go to MyPage
          </button>
        </Link>
      </div>
      <AirlineSearchComponent />
      <AirlineListsComponent />
    </Wrapper>
  );
}

const Wrapper = styled(Vertical)`
  width: 100vw;
  height: 100vh;
  background-image: url(${(props) => props.back});
  background-color: rgba(0, 0, 0, 0.5); // 기본적으로 약간 어둡게 처리
  background-size: 100% auto;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  z-index: 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); // 어둡게 만드는 오버레이
    z-index: -1; // 백그라운드 이미지 위에 위치
  }
`;

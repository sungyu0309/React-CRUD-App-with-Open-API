import React from "react";
import { Horizontal } from "../../styles/CommunalStyle";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate(); // navigate 함수로 수정

  return (
    <Wrapper>
      <Logo>WanderAir</Logo>
      <BtnContainer>
        <NavigateBtn onClick={() => navigate("/")}>Main</NavigateBtn> {/* 오타 수정 */}
        <NavigateBtn onClick={() => navigate("/mypage")}>My Page</NavigateBtn> {/* 오타 수정 */}
      </BtnContainer>
    </Wrapper>
  );
}

const Wrapper = styled(Horizontal)`
  position: fixed;
  top: 0;
  padding: 10px 5px;
`;

const Logo = styled.span`
  padding: 10px;
  font-size: 35px;
  font-weight: 1000;
  color: #e99953;
`;

const BtnContainer = styled.div``;

const NavigateBtn = styled.button`
  border: none;
  width: 100px;
  margin-right: 20px;
  height: 50px;
  background-color: transparent;
  color: #e99953;
  font-size: 20px;
  font-weight: 600;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    border: 2px solid #e99953;
  }
`;

import React from "react";
import styled from "styled-components";

export default function SearchModalComponent(props) {
  function closeModal() {
    props.closeModal();
  }

  return (
    <ModalWrapper>
      <Modal
        onClick={(e) => e.stopPropagation()}
        top={props?.position.top}
        left={props?.position.left}
      >
        <CloseBtn onClick={closeModal}>
          <i className="fa fa-close" style={{ fontSize: "20px" }}></i>
        </CloseBtn>
        <h4 style={{ marginTop: "10px" }}>
          {props.position.type === "depart" ? "출발지 검색" : "도착지 검색"}
        </h4>
        {props.children}
      </Modal>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  border: 1px solid black;
  top: ${(props) => `${props.top + 30}px` || "0px"};
  left: ${(props) => `${props.left}px` || "0px"};
  position: absolute;
  width: 300px;
  height: 200px;
  padding: 40px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 40px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;

const CloseBtn = styled.button`
  border: none;
  background-color: white;
  position: absolute;
  top: 44px;
  right: 44px;
  cursor: pointer;
`;

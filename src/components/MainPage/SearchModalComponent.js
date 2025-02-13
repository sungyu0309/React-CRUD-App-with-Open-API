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
        {props.position.type && (
          <h3 style={{ marginTop: "10px" }}>
            {props.position.type === "depart" ? "출발지 검색" : "도착지 검색"}
          </h3>
        )}
        {props.children}
      </Modal>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  border: 0.1px solid gray;
  top: ${(props) => `${props.top + 90}px` || "0px"};
  left: ${(props) => `${props.left - 10}px` || "0px"};
  position: absolute;
  width: 400px;
  height: 200px;
  padding: 40px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgb(32 33 36 / 28%);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseBtn = styled.button`
  border: none;
  background-color: white;
  position: absolute;
  top: 44px;
  right: 44px;
  cursor: pointer;
`;

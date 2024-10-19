import React, { useEffect } from "react";
import styled from "styled-components";

/* modal창 외부화면 */
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
`;

const Modal = styled.div`
  position: absolute;
  width: 50vw;
  height: 50vh;
  padding: 40px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 40px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  overflow: auto;
`;

const CloseBtn = styled.button`
  border: none;
  background-color: white;
  position: absolute;
  top: 44px;
  right: 44px;
  cursor: pointer;
`;

function ModalComponent(props) {
  function closeModal() {
    props.closeModal();
  }
  useEffect(() => {
    document.body.style = `overflow: hidden`; //hidden : 스크롤 방지
    return () => (document.body.style = `overflow: auto`);
  }, []);

  return (
    <ModalWrapper onClick={closeModal}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={closeModal}>
          <i className="fa fa-close" style={{ fontSize: "20px" }}></i>
        </CloseBtn>
        {props.children}
      </Modal>
    </ModalWrapper>
  );
}

export default ModalComponent;

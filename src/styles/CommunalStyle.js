import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
`;

export const Horizontal = styled.div`
  //가로 정렬
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
export const NoCenterHorizontal = styled.div`
  //가로 정렬
  display: flex;
  align-items: center;
  width: 100%;
`;
export const Vertical = styled.div`
  //세로 정렬
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const WrapContainer = styled.div`
  height: auto;
  min-height: 100%;
  padding-bottom: 200px;
`;

export const NoCenterVertical = styled.div`
  //세로 정렬
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const Box20 = styled.div`
  margin-bottom: 20px;
`;

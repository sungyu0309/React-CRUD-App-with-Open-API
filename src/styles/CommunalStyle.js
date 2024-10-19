import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
  flex-wrap: wrap; /* 자식 요소가 넘칠 때 자동으로 줄바꿈 */
`;

export const Horizontal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* 카드 간격을 일정하게 */
  width: 100%;
`;

export const NoCenterHorizontal = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Vertical = styled.div`
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export const Box20 = styled.div`
  margin-bottom: 20px;
`;

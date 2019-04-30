import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  flex-direction: column;

  div {
    background-color: #ffff;
    width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;

    margin: 20px;
  }
`;

import styled from "styled-components";

export const Container = styled.div`
  height: 20px;
  border-radius: 5px;
  border-color: gray;

  .row {
    display: flex;
    flex-direction: row;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

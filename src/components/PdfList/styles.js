import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  .t {
    display: flex;
    flex-direction: column;
    height: 500px;
    overflow-y: scroll;
  }
  .btn {
    margin: 10px;
  }
  .box {
    border-radius: 5px;
    border-color: gray;
    margin: 20px;
    padding: 0 10px;
    background-color: #ffffff;
    width: 500px;
    min-height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: #b0c4de;
    }

    .inside-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;

      .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        h3 {
          font-size: 14px;
        }
        p {
          font-size: 13px;
        }
      }
      .vinculo {
        width: 50%;
        padding: 20px;
      }
      .indicadores {
        width: 30%;
      }
    }
  }
`;

import styled from 'styled-components';
import { getStyledColor } from 'utils';

export const UserTable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding: 20px;
  margin: 30px auto;

  .tbody {
    font-size: 20px;
    font-weight: bold;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    width: 100px;
    padding: 10px;
    border: 1px solid #ddd;
    background-color: #f2f2f2;
    text-align: left;
  }

  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }

  input {
    width: 100%;
    padding: 5px;
    border: 1px solid #ddd;
  }

  .changeNickname {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .passwordtable {
    width: 100%;
    > table {
    }
  }
  .passwordtable th {
    border: none;
    background-color: transparent;
  }

  .passwordtable table {
    border-collapse: separate;
  }

  .passwordtable button {
    margin: 15px 8px;
  }

  .likesbook {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  .editNickname {
    background-color: transparent;
  }

  .changeNickname {
    margin: 10px 0px;
    padding: 10px;
    border: 1px solid #dadde4;
    background-color: #f0f0f0;
    color: #555;
    font-size: 11px;
    width: 70%;

    input {
      height: 22px;
      padding: 2px 5px;
      line-height: 22px;
      border: 1px solid #dadde4;
    }
  }

  .passwordtable {
    font-size: 12px;
    width: 270px;
  }

  h1 {
    color: black;
  }
  .likesbook h1 {
    margin-top: 80px;
  }
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  padding: 20px;
`;
export const Section = styled.section`
  width: 100%;
  margin-bottom: 20px;
`;
export const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  width: 100%;
`;
export const Divider = styled.div`
  width: 100%;
  height: 3px;
  background-color: ${getStyledColor('gray', 600)};
  margin: 20px 0;
  border-radius: 5px;
`;
export const BookWrapper = styled.div<{ $isSuccess?: boolean }>`
  display: grid;
  flex-wrap: wrap;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  transition: opacity 1s ease;
  opacity: ${({ $isSuccess }) => ($isSuccess ? 1 : 0)};
`;
export const CardWrapper = styled.div`
  position: relative;
`;
export const IconWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 5px;
  position: relative;
  gap: 10px;
`;
export const Icon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 50%;
  &:hover {
    background-color: ${getStyledColor('red', 800)};
  }
`;
export const IconBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
export const ProfileImgBtnWrap = styled.div`
  margin: 10px 0;
`;

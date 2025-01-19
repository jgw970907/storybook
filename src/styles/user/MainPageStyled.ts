import styled from 'styled-components';
import { getStyledColor } from 'utils';

export const Layout = styled.div`
  width: 1200px;
  margin: 0 auto;
  background-color: ${getStyledColor('background', 'dark')};
  display: grid;
  grid-gap: 5px;
  grid-auto-flow: dense;
  grid-auto-rows: minmax(400px, auto);
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));

  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-auto-rows: minmax(350px, auto);
  }
`;

export const TotheTop = styled.button`
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 200;
  font-weight: bold;
  font-size: 15px;
  padding: 15px 10px;
  background-color: #000;
  color: #fff;
  border: 2px solid rgb(210, 204, 193);
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  transition:
    color 0.2s,
    border 0.2s,
    background-color 0.2s;

  &:hover {
    color: ${getStyledColor('white', 'high')};
    border: 2px solid ${getStyledColor('teal', 600)};
    background-color: ${getStyledColor('teal', 600)};
  }
  @media screen and (max-width: 1400px) {
    font-size: 10px;
    padding: 10px 5px;
    border: 1px solid rgb(210, 204, 193);
  }
`;

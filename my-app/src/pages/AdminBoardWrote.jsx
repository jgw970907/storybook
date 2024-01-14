import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { usefetch } from '../hooks/usefetch';
const AdminBoardWrote = () => {
  const [boards, setBoards] = useState([]);
  const { isLoading, error, sendRequest } = usefetch();

  useEffect(() => {
    const fetchBoards = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_SERVER_URL}/api5s`,
        'GET',
        null,
        {
          'Content-Type': 'application/json',
        },
      );
      setBoards(responseData);
    };
    fetchBoards();
  }, []);
  console.log(boards);
  return <div>AdminBoardWrote</div>;
};

export default AdminBoardWrote;

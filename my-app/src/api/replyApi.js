const BASE_URL = process.env.REACT_APP_SERVER_URL;
export const getBoardComments = async (boardId) => {
  try {
    const response = await fetch(`${BASE_URL}/api5s/${boardId}/reply5s`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const res = await response.json();
    if (res.statusCode === 400 || res.statusCode === 401) {
      throw new Error(`HTTP error! status: ${response.status} message: ${response.statusText}`);
    }
    return { data: res.data };
  } catch (error) {
    console.error('Network or other error:', error.message);
    throw error;
  }
};

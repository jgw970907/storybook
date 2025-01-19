const makeDateStr = (date: string) => {
  const temp = new Date(date);

  const year = temp.getFullYear();
  const month = temp.getMonth() + 1;
  const day = temp.getDate();

  return `${year}-${month}-${day}`;
};

export default makeDateStr;

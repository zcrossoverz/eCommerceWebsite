const convertDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN');
};
export default convertDate;

export const dateToString = (time: string) => {
  const date = new Date(time);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  return `${('0' + day).slice(-2)}/${('0' + month).slice(-2)}/${year} ${hours}:${minutes}:${seconds}`;
};

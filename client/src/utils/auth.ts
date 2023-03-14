export const saveAccessToken = (token: string) => {
  return localStorage.setItem('token', token);
};
export const clearAccessToken = () => {
  return localStorage.removeItem('token');
};
export const getAccessToken = () => {
  return localStorage.getItem('token');
};

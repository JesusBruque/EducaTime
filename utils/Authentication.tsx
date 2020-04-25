import axios from 'axios';
const AUTHENTICATION_URL = 'http://localhost:5000/api/authentication';

export const login = (credentials: { email: string, password: string }) => axios.post(AUTHENTICATION_URL, credentials);
export const logout = () => axios.delete(AUTHENTICATION_URL);
export const check = () => axios.get(AUTHENTICATION_URL);


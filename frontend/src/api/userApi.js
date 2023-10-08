import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/v1';

//The userApi object contains several methods.
//Those are used by the userSlice to make requests to the backend according to the user's actions and to each
export const userApi = {

  login: async (credentials) => {
    const response = await axios.post(`${baseUrl}/user/login`, credentials);
    return response.data.body.token;
  },

  signup: (credentials) => {
    return axios.post(`${baseUrl}/user/signup`, credentials);
  },

  getProfile: async (token) => {
    let response = await axios.post(`${baseUrl}/user/profile`, {}, {//empty object is required to send the token. Without it, the token is not sent because axios.post() expects a second argument.
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.body; 
  },  

  updateProfile: async (token, updatedProfile) => {
    let response = await axios.put(`${baseUrl}/user/profile`, updatedProfile, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.body;
  },
};

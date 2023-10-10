import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from '../../api/userApi';

const TOKEN_KEY = 'token';

const initialState = {
  token: localStorage.getItem(TOKEN_KEY) || null || sessionStorage.getItem(TOKEN_KEY), //If the user has a token in localStorage, we use that. Else, we check sessionStorage.
  loginStatus: 'idle',
  loginError: null,
  profile: null,
  profileStatus: 'idle',
  profileError: null,
  rememberMe: false
};

//Slice user to manage the state of the user's login, the loading of the user profile, and the updating of the user profile.
//This state is used in multiple components to display appropriate UI.
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //If the user logs out, the logout action will clear the token from the state.
    logout: (state) => {
      state.token = null;
      state.loginStatus = 'idle';
      state.profile = null;
    },
    //If the token has expired, this action will be dispatched to clear the token from the state.
    tokenExpired: (state) => {
      state.token = null;
      state.loginStatus = 'idle';
      state.profile = null;
    },
  },
  //Here we handle the results of the async thunks.
  extraReducers: (builder) => {
    builder
      //Update profile cases
      .addCase(updateUserProfile.pending, (state) => {
        state.profileStatus = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profileStatus = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.profileStatus = 'failed';
        state.profileError = action.error.message;
      })
      //Login cases
      .addCase(login.pending, (state) => {
        state.loginStatus = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = 'succeeded';
        state.token = action.payload.token;
        state.rememberMe = action.payload.rememberMe; //If the user checks the Remember Me checkbox, we store the username in localStorage. Else, it is stored in sessionStorage.
     })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = 'failed';
        state.loginError = action.payload.message;
      })
      //Load profile cases
      .addCase(loadUserProfile.pending, (state) => {
        state.profileStatus = 'loading';
      })
      .addCase(loadUserProfile.fulfilled, (state, action) => {
        state.profileStatus = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(loadUserProfile.rejected, (state, action) => {
        state.profileStatus = 'failed';
        state.profileError = action.error.message;
      });
  },
});

//Async Thunks to manage the user's login, the loading of the user profile, and the updating of the user profile.

//Returns the user token from the API, and the rememberMe value from the form
export const login = createAsyncThunk('user/login', async ({ credentials, rememberMe }, { rejectWithValue }) => {
  try {
     const response = await userApi.login(credentials);
     return { token: response, rememberMe };
  } catch (error) {
     return rejectWithValue(error.response.data);
  }
});

//Returns the user profile from the API
export const loadUserProfile = createAsyncThunk('user/loadUserProfile', async (token, { rejectWithValue }) => {
  try {
    const response = await userApi.getProfile(token);
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

//Returns the updated user profile from the API
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (updatedProfile, { getState, rejectWithValue }) => {
    const { token } = getState().user;
    try {
      const response = await userApi.updateProfile(token, updatedProfile);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const { logout, tokenExpired } = userSlice.actions;
export default userSlice.reducer;

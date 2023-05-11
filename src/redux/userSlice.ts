import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

interface State {
  user: any;
  token: string | null;
}

const initialState: State = {
  user: null,
  token: null,
};

if (localStorage.getItem("h-tweet-token")) {
  const decodedToken: any = jwtDecode(
    localStorage.getItem("h-tweet-token") || ""
  );

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("h-tweet-token");
  } else {
    initialState.user = decodedToken;
    initialState.token = localStorage.getItem("h-tweet-token");
  }
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLogout: (state) => {
      localStorage.removeItem("h-tweet-token");
      state.user = null;
      state.token = null;
    },
  },
});

export const { setLogin, setToken, setLogout } = userSlice.actions;

export default userSlice.reducer;

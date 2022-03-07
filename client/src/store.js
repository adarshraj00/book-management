import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/saga";
export const sagaMiddleware = createSagaMiddleware();
const initialState = {
  isAdmin: false,
  isUser: false,
  isLoading: false,
  error: null,
  idOfUser: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdmin(state, action) {
      state.isAdmin = true;
      state.id = action.payload.id;
    },
    setUser(state, action) {
      state.isUser = true;
      state.id = action.payload.id;
    },
    logout(state) {
      state.isAdmin = false;
      state.isUser = false;
      state.idOfUser=null;
      state.isLoading=false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

const toasts = createSlice({
  name: "toasts",
  initialState: { msg: "", type: "success", show: false },
  reducers: {
    setToast: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearToast: (state, action) => {
      state.msg = "";
      state.show = false;
    },
  },
});
export const toastsActions=toasts.actions;
export const authActions = authSlice.actions;
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    toasts: toasts.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return [sagaMiddleware, ...getDefaultMiddleware({ thunk: false })];
  },
});

sagaMiddleware.run(rootSaga);
export default store;

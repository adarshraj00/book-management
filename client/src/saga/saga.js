import {takeEvery, put,all} from 'redux-saga/effects';
import authApi from '../api/auth';
import { authActions } from '../store';
import  sagaActions from './sagaActions';
const loginAdmin=function* (action){
  try{
    yield put(authActions.setLoading(true));
    console.log(action.payload)
    const response=yield authApi.loginAdmin(action.payload);
    yield put(authActions.setAdmin(response.data.admin));
  }catch(err){
    yield put(authActions.setError(err.response.data.msg));
  }
}   
const loginUser=function* (action){
  try{
    yield put(authActions.setLoading(true));
    const response=yield authApi.loginUser(action.payload);
    yield put(authActions.setUser(response.data.user));
  }catch(err){
    yield put(authActions.setError(err.response.data.msg));
  }
}

const registerUser=function * (){

}

const logout =function* (){
  try{
    yield authApi.logout();
    yield put(authActions.logout())
  }catch(err){
    console.log(err)
  }
}
const getState=function*(){
  
}
export default function* rootSaga() {
  yield all([
    takeEvery(sagaActions.LOGIN_ADMIN,loginAdmin),
    takeEvery(sagaActions.LOGIN_USER,loginUser),
    takeEvery(sagaActions.REGISTER_USER,registerUser),
    takeEvery('LOGOUT',logout),
    takeEvery(sagaActions.GET_STATE,getState)
  ]);
}
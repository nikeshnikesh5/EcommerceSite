import { LOGIN_USER } from '../constants/userConstant'
import { LOGOUT_USER } from '../constants/userConstant'
import axios from 'axios'


export const setReduxUserState = (userCreated) => (dispatch) => {
    dispatch({
        type: LOGIN_USER,
        payload: userCreated
    })
}

export const logout =()=> (dispatch) => {
    document.location.href = "/login";
    axios.get('/api/logout')
    localStorage.removeItem("userInfo");
    sessionStorage.removeItem("userInfo");
    localStorage.removeItem("cart");
    dispatch({ type: LOGOUT_USER })
}

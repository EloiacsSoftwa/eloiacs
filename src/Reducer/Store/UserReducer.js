import { act } from "react-dom/test-utils";
import { LOGIN_API_RESPONSE, ERROR_TYPE, ERROR_MESSAGE, CLEAR_ERROR_MESSAGE, REGISTER_API_RESPONSE, UPDATE_USER_ID_LOCALLY, GET_LOGGED_USER_DETAILS_RESPONSE, USER_ACCOUNT_LOGOUT, RESET_PASSWORD_API_RESPONSE } from "../../utils/Constant";


const INITIAL_STATE = {
  status: 0,
  loginId: 0,
  loginName: "",
  loginRoleId: 0,
  loginCountryId: 0,
  loginEmail: "",
  loginMobile: "",
  isActive: true,
  isLoggedIn: false,
  error: "",
  userRole: 0,
  userRoleName: '',
  resetPassword: '',
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_API_RESPONSE: {
      const data = action.payload.data;
      return {
        ...state,
        status: action.payload.code,
        loginId: data.id,
        loginName: data.name,
        loginRoleId: data.roleId,
        loginCountryId: data.countryId,
        loginEmail: data.email,
        loginMobile: data.mobile,
        isActive: data.active,
        isLoggedIn: true,
        userRole: data.roleId,
        userRoleName: data.roleName
      };
    }
    case ERROR_TYPE: {
      return { ...state, error: action.payload };
    }
    case CLEAR_ERROR_MESSAGE: {
      return { ...state, error: null };
    }

    case ERROR_MESSAGE: {
      console.log(action)
      return {...state, error: action.payload}
    }

    case REGISTER_API_RESPONSE: {
      return { ...state, error: action.payload.errorMessage, status: 200, isLoggedIn: true, loginId: action.payload.id }
    }

    case UPDATE_USER_ID_LOCALLY: {
      return { ...state, loginId: action.payload }
    }
    case GET_LOGGED_USER_DETAILS_RESPONSE: {
      return { ...state, loginName: action.payload.name, loginMobile: action.payload.mobile, UserRoleID:action.payload.roleId, UserRoleName:action.payload.roleName, isLoggedIn: true }
    }

    case USER_ACCOUNT_LOGOUT: {
      return {...state, isLoggedIn: false}
    }

    case RESET_PASSWORD_API_RESPONSE: {
      return { ...state, resetPassword: action.payload.data }
    }

  }
  return state;
}

export default UserReducer;

import axios from 'axios'
import { push } from 'react-router-redux'
// import { setCurrentUser, authSet } from '../../../redux/session.js'
const ROOT_URL = 'http://localhost:3090'
// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN_START = 'LOGIN_START'
export const LOGIN_FINISH = 'LOGIN_FINISH'
export const LOGIN_ERROR = 'LOGIN_ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export const loginStart = () => ({type: LOGIN_START})
export const loginFinish = () => ({type: LOGIN_FINISH})
export const loginError = (error) => ({ type: LOGIN_ERROR, payload: error })

// ------------------------------------
// Thunk Actions
// ------------------------------------

export const emailLogin = ({email, password, rememberMe}) => (dispatch, getState) => {
  console.log('please works')
  dispatch(loginStart())
  // submit email password to server
  axios.post(`${ROOT_URL}/login`, {
    email, password, rememberMe: JSON.stringify(rememberMe)
  })
  .then((response) => {
    console.log('after response')
    // save the JWT token to local storage
    localStorage.setItem('token', response.data.token)
    // dispatch(setCurrentUser(response.data.user))
    // update state to indicate user is authenticated
    setTimeout(function() {
      dispatch(loginFinish())
      // redirect to the route /feature
      dispatch(push('/'))
    }, 300) // add slight delay for loader to draw for ux
  })
  .catch((error) => errorHandler(error, dispatch))
}

// ------------------------------------
// Util Function
// ------------------------------------
function errorHandler(error, dispatch) {
  // error case when Api server is down
  if (error instanceof Error && error.message.includes('Network')) {
    dispatch(loginError({
      message: `Sorry there's a ${error.message}. Please retry again later.`,
      status: true
    }))
  } else { // if request is bad...
    dispatch(loginError({
      message: error.response.data.message || error.response.statusText,
      status: true
    }))
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGIN_START]: (state) => ({
    ...state,
    loading: true,
    error: { message: '', status: false } // reset error on auth start
  }),
  [LOGIN_FINISH]: (state) => ({
    ...state,
    loading: false
  }),
  [LOGIN_ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  loading: false,
  error: {
    message: '',
    status: false
  },
  google: {
    url: 'http://localhost:3090/auth/google',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
    params: {
      client_id: '781005171750-aulvo8dfukpk701v9je8h12rohj5gqg7.apps.googleusercontent.com',
      redirect_uri: 'http://localhost:3000/auth/google/callback',
      scope: 'openid profile email',
      response_type: 'code'
    }
  },
  github: {
    url: 'http://localhost:3090/auth/github',
    authorizationUrl: 'https://github.com/login/oauth/authorize',
    params: {
      client_id: '1a2a27518c8044d4ac47',
      redirect_uri: 'http://localhost:3000/auth/github/callback',
      scope: 'user:email profile repo',
      response_type: 'code'
    }
  }
}

export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

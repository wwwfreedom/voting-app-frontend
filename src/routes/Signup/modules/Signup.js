import axios from 'axios'
import { push } from 'react-router-redux'
import { setCurrentUser, authSet } from 'redux/session.js'
import {apiUrl, googleOauthParams, githubOauthParams} from 'globalVar.js'

// ------------------------------------
// Constants
// ------------------------------------
export const SIGNUP_START = 'SIGNUP_START'
export const SIGNUP_FINISH = 'SIGNUP_FINISH'
export const SIGNUP_ERROR = 'SIGNUP_ERROR'

// ------------------------------------
// Actions
// ------------------------------------
export const signupStart = () => ({type: SIGNUP_START})
export const signupFinish = () => ({type: SIGNUP_FINISH})
export const signupError = (error) => ({ type: SIGNUP_ERROR, payload: error })

// ------------------------------------
// Thunk Actions
// ------------------------------------

export const emailSignup = ({firstName, lastName, email, password}) => (dispatch, getState) => {
  dispatch(signupStart())
  // submit email password to server
  axios.post(`${apiUrl}/signup`, { firstName, lastName, email, password })
  .then((response) => {
    // save the JWT token to local storage
    localStorage.setItem('token', response.data.token)
    dispatch(setCurrentUser(response.data.user))
    // update state to indicate user is authenticated
    dispatch(authSet(true))
    setTimeout(function() {
      dispatch(signupFinish())
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
    dispatch(signupError({
      message: `Sorry there's a ${error.message}. Please retry again later.`,
      status: true
    }))
  } else { // if request is bad...
    dispatch(signupError({
      message: error.response.data.message || error.response.statusText,
      status: true
    }))
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SIGNUP_START]: (state) => ({
    ...state,
    loading: true,
    error: { message: '', status: false } // reset error on auth start
  }),
  [SIGNUP_FINISH]: (state) => ({
    ...state,
    loading: false
  }),
  [SIGNUP_ERROR]: (state, action) => ({
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
  google: googleOauthParams,
  github: githubOauthParams
}

export default function loginReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

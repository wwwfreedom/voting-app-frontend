// import axios from 'axios'
import { push } from 'react-router-redux'

// Constants
export const CURRENT_USER = 'CURRENT_USER'
export const AUTH_SET = 'AUTH_SET'
export const LOG_OUT = 'LOG_OUT'

// Actions
export const setCurrentUser = (user) => ({type: CURRENT_USER, payload: user})
export const authSet = (state) => ({type: AUTH_SET, payload: state})
// ------------------------------------
// Thunk Actions
// ------------------------------------

export const logOut = () => (dispatch, getState) => {
  // reset the user
  dispatch(setCurrentUser(initialState.currentUser))
  dispatch(authSet(false))
  localStorage.removeItem('token')
  dispatch(push('/'))
}

// export const getCurrentUser = () => (dispatch) => {
//   axios.get(`${ROOT_URL}/api/user/profile`, {
//     headers: { authorization: localStorage.getItem('token') }
//   })
//   .then((response) => {
//     dispatch(setCurrentUser(response.data))
//     // setCurrentUser(dispatch, response.data)
//     dispatch(loginFinish())
//   })
//   .catch((error) => {
//     console.log(error)
//     dispatch(push('/signin'))
//   })
// }

// Reducer
const initialState = {
  currentUser: { firstName: '' },
  authenticated: false,
  // socket: null,
  error: null
}

// Actions Handlers
const ACTION_HANDLERS = {
  [CURRENT_USER]: (state, action) => ({
    ...state, currentUser: action.payload
  }),

  [AUTH_SET]: (state, action) => ({
    ...state, authenticated: action.payload
  })
}

export default function Session(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

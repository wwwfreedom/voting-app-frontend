// import axios from 'axios'
// import { push } from 'react-router-redux'
// const ROOT_URL = 'http://localhost:3090'
// import {loginFinish} from '../routes/Login/modules/login.js'

// Constants
export const CURRENT_USER = 'CURRENT_USER'
// export const SESSION_ERROR = 'SESSION_ERROR'
export const AUTH_SET = 'AUTH_SET'

// Actions
export const setCurrentUser = (user) => ({type: CURRENT_USER, payload: user})
export const authSet = (state) => ({type: AUTH_SET, payload: state})

// Thunk actions
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

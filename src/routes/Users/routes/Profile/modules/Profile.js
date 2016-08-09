import axios from 'axios'
import { apiUrl } from 'globalVar.js'
import errorHandler from 'utils/errorHandler'
// ------------------------------------
// Constants
// ------------------------------------

export const PROFILE_FETCH_START = 'PROFILE_FETCH_START'
export const PROFILE_FETCH_FINISH = 'PROFILE_FETCH_FINISH'
export const PROFILE_FETCH_ERROR = 'PROFILE_FETCH_ERROR'
export const PROFILE_IS_OWNER = 'PROFILE_IS_OWNER'
// ------------------------------------
// Actions
// ------------------------------------

export const profileFetchStart = () => ({type: PROFILE_FETCH_START})
export const profileFetchFinish = (data) => ({type: PROFILE_FETCH_FINISH, payload: data})
export const profileFetchError = (error) => ({type: PROFILE_FETCH_ERROR, payload: error})
export const profileIsOwner = (value) => ({type: PROFILE_IS_OWNER, payload: value})
// ------------------------------------
// Thunk Actions
// ------------------------------------

export const profileFetch = (userId) => (dispatch, getState) => {
  const {currentUser, authenticated} = getState().session
  if (authenticated) {
    console.log(currentUser._id)
    if (currentUser._id === userId) dispatch(profileIsOwner(true))
  }
  dispatch(profileFetchStart())
  axios.get(`${apiUrl}/user/profile/${userId}`)
  .then((response) => {
    dispatch(profileFetchFinish(response.data))
  })
  .catch((error) => errorHandler(error, dispatch, profileFetchError))
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PROFILE_FETCH_START]: (state) => ({
    ...state,
    loading: {type: 'fetch', status: true},
    error: { message: '', status: false }
  }),
  [PROFILE_FETCH_FINISH]: (state, action) => ({
    ...state,
    loading: {type: '', status: false},
    polls: action.payload
  }),
  [PROFILE_FETCH_ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: {type: '', status: false}
  }),
  [PROFILE_IS_OWNER]: (state, action) => ({
    ...state,
    isOwner: action.payload
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loading: {
    type: '',
    status: false
  },
  isOwner: false,
  polls: [
    {
      question: '',
      voters: [],
      createdBy: {
        _id: '',
        firstName: '',
        lastName: ''
      }
    }
  ],
  error: {
    message: '',
    status: false
  }
}

export default function ProfileReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

import axios from 'axios'
import { apiUrl } from 'globalVar.js'
import errorHandler from 'utils/errorHandler'

// ------------------------------------
// Constants
// ------------------------------------

export const POLL_FETCH_START = 'POLL_FETCH_START'
export const POLL_FETCH_FINISH = 'POLL_FETCH_FINISH'
export const POLL_FETCH_ERROR = 'POLL_FETCH_ERROR'

export const POLL_VOTE_START = 'POLL_VOTE_START'
export const POLL_VOTE_FINISH = 'POLL_VOTE_FINISH'
export const POLL_VOTE_ERROR = 'POLL_VOTE_ERROR'
export const HAS_VOTED = 'HAS_VOTED'

// ------------------------------------
// Actions
// ------------------------------------

export const pollVoteStart = () => ({type: POLL_VOTE_START})
export const pollVoteFinish = (data, message) => ({type: POLL_VOTE_FINISH, payload: {poll: data, message}})
export const pollVoteError = (error) => ({type: POLL_VOTE_ERROR, payload: error})

export const pollFetchStart = () => ({type: POLL_FETCH_START})
export const pollFetchFinish = (data) => ({type: POLL_FETCH_FINISH, payload: data})
export const pollFetchError = (error) => ({type: POLL_FETCH_ERROR, payload: error})
export const hasVoted = () => ({type: HAS_VOTED})
// ------------------------------------
// Thunk Actions
// ------------------------------------

export const hasUserVoted = (userId, voters) => {
  // check if user has already voted
  const hasVotedUserId = voters.filter((voter) => voter === userId)[0]
  if (hasVotedUserId === userId) return true
  return false
}

export const pollFetch = (id) => (dispatch, getState) => {
  dispatch(pollFetchStart())
  axios.get(`${apiUrl}/poll/${id}`)
  .then((response) => {
    dispatch(pollFetchFinish(response.data.poll))
    // check if user has voted
    if (getState().session.authenticated) {
      const userId = getState().session.currentUser._id
      const voters = getState().PollFetch.poll.voters
      if (hasUserVoted(userId, voters)) dispatch(hasVoted())
    }
  })
  .catch((error) => errorHandler(error, dispatch, pollFetchError))
}

export const pollVote = (optionId) => (dispatch, getState) => {
  if (getState().session.authenticated) {
    const userId = getState().session.currentUser._id
    const voters = getState().PollFetch.poll.voters
    if (hasUserVoted(userId, voters)) {
      dispatch(hasVoted())
      return dispatch(
        pollVoteError({message: 'You have already voted', status: true}))
    }
    const pollId = getState().PollFetch.poll._id
    const updatedOptions = getState().PollFetch.poll.options.map((option) => {
      if (option._id === optionId) {
        return {
          ...option,
          votes: option.votes + 1
        }
      } else {
        return option
      }
    })
    const payload = {
      options: updatedOptions,
      voterId: userId
    }
    dispatch(pollVoteStart())
    axios.put(`${apiUrl}/poll/${pollId}`, payload)
    .then((response) => {
      // fill in the createBy fields
      const pollWithCreateBy = {
        ...response.data.poll,
        createdBy: getState().PollFetch.poll.createdBy
      }
      dispatch(pollVoteFinish(pollWithCreateBy, response.data.message))
    })
    .catch((error) => errorHandler(error, dispatch, pollVoteError))
  } else {
    dispatch(pollVoteError({message: 'Please log in to vote', status: true}))
  }
}

export const resetError = () => (dispatch) => {
  dispatch(pollVoteError({message: '', status: false}))
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [POLL_FETCH_START]: (state) => ({
    ...state,
    loading: true,
    error: { message: '', status: false }
  }),
  [POLL_FETCH_FINISH]: (state, action) => ({
    ...state,
    loading: false,
    poll: action.payload
  }),
  [POLL_FETCH_ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false
  }),
  [POLL_VOTE_START]: (state) => ({
    ...state,
    loading: true,
    error: { message: '', status: false },
    successMessage: ''
  }),
  [POLL_VOTE_FINISH]: (state, action) => ({
    ...state,
    loading: false,
    poll: action.payload.poll,
    successMessage: action.payload.message
  }),
  [POLL_VOTE_ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
    loading: false
  }),
  [HAS_VOTED]: (state) => ({
    ...state,
    hasVoted: true
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  successMessage: '',
  loading: false,
  hasVoted: false,
  poll: {
    _id: '',
    voters: [],
    updatedAt: '',
    createdAt: '',
    question: '',
    createdBy: {
      _id: '',
      firstName: '',
      lastName: ''
    },
    options: [
      {
        name: '',
        _id: '',
        votes: 0
      }
    ]
  },
  error: {
    message: '',
    status: false
  }
}

export default function PollFetchReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

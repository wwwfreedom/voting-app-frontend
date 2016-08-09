import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { profileFetch } from '../modules/Profile'
import SizeMe from 'react-sizeme'

import Profile from '../components/Profile'

export class ProfileContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.object.isRequired,
    serverError: PropTypes.object.isRequired,
    size: PropTypes.object.isRequired, // from HOC SizeMe
    polls: PropTypes.array.isRequired,
    isOwner: PropTypes.bool.isRequired,
    routeParams: PropTypes.object // from react-router
  };

  state = {};

  componentDidMount() {
    const { dispatch, routeParams } = this.props
    dispatch(profileFetch(routeParams.id))
  }

  onPollDelete = (e) => {
    console.log(e.currentTarget.value)
  }

  render() {
    const {polls, size: {width}, loading, isOwner} = this.props
    return <div>
      <Profile
        firstName={polls[0].createdBy.firstName}
        lastName={polls[0].createdBy.lastName}
        polls={polls}
        width={width}
        loading={loading}
        onPollDelete={this.onPollDelete}
        isOwner={isOwner}
      />
    </div>
  }
}

const mapStateToProps = (state) => ({
  loading: state.Profile.loading,
  serverError: state.Profile.error,
  polls: state.Profile.polls,
  isOwner: state.Profile.isOwner
})

export default connect(mapStateToProps)(SizeMe({refreshRate: 300})(ProfileContainer))

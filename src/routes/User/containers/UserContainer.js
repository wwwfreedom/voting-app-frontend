import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

// import User from '../components/User'

export class UserContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (this.props.location.pathname === '/user/') {
      // console.log(this.props.route.path)
      this.props.dispatch(push('*'))
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(UserContainer)

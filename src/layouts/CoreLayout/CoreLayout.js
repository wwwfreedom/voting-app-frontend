import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Header from 'components/Header'
import SizeMe from 'react-sizeme'
import style from './CoreLayout.scss'
import '../../styles/core.scss'

export class CoreLayout extends Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired,
    isAuth: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    size: PropTypes.object.isRequired // from HOC SizeMe
  };

  state = { isMobileMenuOpen: false, link: '/' };

  onMobileMenuClick = () => {
    this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen })
  }

  onDropDownMenuChange = (event, index, value) => {
    this.setState({link: value})
    this.props.dispatch(push(value))
  }

  render() {
    const { children, isAuth, user, size: {width} } = this.props
    return (
      <div>
        <Header
          mobileMenuClick={this.onMobileMenuClick}
          isAuth={isAuth}
          user={user}
          link={this.state.link}
          onDropDownMenuChange={this.onDropDownMenuChange}
          width={width}
        />
        <div className={style.mainContainer}>
          {children}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuth: false, // state.auth.isAuth,
  user: {} // state.session.currentUser
})

export default connect(mapStateToProps)(SizeMe({refreshRate: 300})(CoreLayout))

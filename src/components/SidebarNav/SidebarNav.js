import React, { PropTypes } from 'react'
import Drawer from 'material-ui/Drawer'
import {MenuItem} from 'material-ui/Menu'
import {Link} from 'react-router'

const menuItemStylefix = {WebkitAppearance: 'none', cursor: 'pointer'}

export default function SidebarNav ({ docked, onSidebarLinkClick, open, onSidebarActivate, isAuth }) {
  const authenticatedLinks = [
    <Link to='/account' style={{textDecoration: 'none'}}>
      <MenuItem
        primaryText='Account'
        style={menuItemStylefix}
        onTouchTap={onSidebarLinkClick}
        key={1}
      />
    </Link>,
    <Link to='/signout' style={{textDecoration: 'none'}}>
      <MenuItem
        primaryText='Sign out'
        style={menuItemStylefix}
        onTouchTap={onSidebarLinkClick}
        key={2}
      />
    </Link>
  ]

  const unAuthenticatedLinks = [
    <Link to='/login' style={{textDecoration: 'none'}}>
      <MenuItem
        primaryText='Login'
        style={menuItemStylefix}
        onTouchTap={onSidebarLinkClick}
        key={1}
      />
    </Link>,
    <Link to='/signup' style={{textDecoration: 'none'}}>
      <MenuItem
        primaryText='Sign up'
        style={menuItemStylefix}
        onTouchTap={onSidebarLinkClick}
        key={2}
      />
    </Link>
  ]

  return (
    <Drawer
      docked={docked}
      open={open}
      onRequestChange={onSidebarActivate}
    >
      <Link to='/' style={{textDecoration: 'none'}}>
        <MenuItem
          primaryText='Home'
          style={menuItemStylefix}
          onTouchTap={onSidebarLinkClick}
        />
      </Link>
      {isAuth ? authenticatedLinks : unAuthenticatedLinks}
    </Drawer>
  )
}

SidebarNav.propTypes = {
  docked: PropTypes.bool.isRequired,
  onSidebarLinkClick: PropTypes.func.isRequired,
  onSidebarActivate: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  isAuth: PropTypes.bool.isRequired
}

export default SidebarNav

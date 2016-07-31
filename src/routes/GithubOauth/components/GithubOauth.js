import React from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator'

export const GithubOauth = () => (
  <div style={style.container}>
    <div>
      <RefreshIndicator
        size={50}
        left={0}
        top={0}
        loadingColor={'#FF9800'}
        status='loading'
        style={style.refresh}
      />
    </div>
    <div>Logging you in...</div>
  </div>
)

const style = {
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center'
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
    height: '50px',
    marginTop: '50px',
    marginBottom: '20px'
  }
}

export default GithubOauth

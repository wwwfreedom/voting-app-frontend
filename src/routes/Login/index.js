import { injectReducer } from 'store/reducers'
import { skipIfAuthenticated } from 'utils/authHelper'

export default (store) => ({
  path: 'Login',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Login = require('./containers/LoginContainer').default
      const reducer = require('./modules/Login').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'Login', reducer })

      /*  Return getComponent   */
      cb(null, Login)

    /* Webpack named bundle   */
    }, 'Login')
  },
  onEnter (nextState, replace) {
    // make sure user is authenticated before route can be access
    skipIfAuthenticated(store, nextState, replace)
  }
})

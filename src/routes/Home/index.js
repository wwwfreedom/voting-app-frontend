import { injectReducer } from 'store/reducers'
import { homeFetch } from './modules/Home'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Home = require('./containers/HomeContainer').default
      const reducer = require('./modules/Home').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'Home', reducer })

      /*  Return getComponent   */
      cb(null, Home)

    /* Webpack named bundle   */
    }, 'Home')
  },
  onEnter (nextState, replace, callback) {
    console.log('fetching home', new Date())
    store.dispatch(homeFetch())
    callback()
  }
})

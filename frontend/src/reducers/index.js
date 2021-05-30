import { combineReducers } from 'redux'

import auth from './auth'

/**
 *  Combine all reducers into a single, root reducer. 
 */

export default combineReducers({
    auth
})

import { combineReducers } from 'redux'

import auth from './auth'
import todos from './todos'

/**
 *  Combine all reducers into a single, root reducer. 
 */

export default combineReducers({
    auth,
    todos,
})

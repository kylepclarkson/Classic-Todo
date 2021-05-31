import { combineReducers } from 'redux'

import auth from './auth'
import todos from './todos'
import messages from './messages'

/**
 *  Combine all reducers into a single, root reducer. 
 */

export default combineReducers({
    auth,
    todos,
    messages,
})

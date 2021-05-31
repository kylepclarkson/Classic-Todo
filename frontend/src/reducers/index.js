import { combineReducers } from 'redux'

import auth from './auth'
import errors from './errors'
import messages from './messages'
import todos from './todos'

/**
 *  Combine all reducers into a single, root reducer. 
 */

export default combineReducers({
    auth,
    errors,
    messages,
    todos,
})

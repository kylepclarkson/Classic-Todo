import { GET_MESSAGES, CREATE_MESSAGE } from "../actions/types";

const initialState = {
  msg: {},
  status: null,
};

export default function (state = initialState, action) {
  switch (action.type) {

    case GET_MESSAGES:
      return action.payload
    
      case CREATE_MESSAGE:
      state = action.payload;
      return state;

    default:
      return state;
  }
}

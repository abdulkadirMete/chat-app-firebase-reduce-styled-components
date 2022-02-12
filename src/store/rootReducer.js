import { combineReducers } from "redux";
import { reducer as firebase } from "react-redux-firebase";
import ChannelReducer from "./reducer/ChannelReducer";

export const rootReducer = combineReducers({
  firebase,
  channels:ChannelReducer
});



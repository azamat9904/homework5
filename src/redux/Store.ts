import {applyMiddleware, combineReducers, createStore} from 'redux';
import {chatStateReducer} from "./chatReducer/chatStateReducer";
import thunk from 'redux-thunk';

const reducers = combineReducers({
    chatList:chatStateReducer
});
export const store = createStore(reducers,applyMiddleware(thunk));


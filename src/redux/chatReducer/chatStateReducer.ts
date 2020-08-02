import {ChatActionTypes, chatStateEnum, IChatState} from "./chatStateTypes";

const initialState:IChatState = {
    messages:[]
};

export const chatStateReducer = (state=initialState,action:ChatActionTypes):IChatState=>{
    switch (action.type) {
        case chatStateEnum.SEND_MESSAGE :
            return {messages:[...state.messages,action.payload]};
        default :
            return state;
    }
};

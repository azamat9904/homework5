import React from 'react';
import {UserInfo} from "../types/interfaces";

export interface UserContext {
    user:UserInfo | null;
    setUser:(user:UserInfo)=>void;
}
export const UserContext = React.createContext<UserContext | null>(null);

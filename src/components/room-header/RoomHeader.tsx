import React, {CSSProperties, useContext} from 'react';
import {UserContext} from "../../services/context";

const RoomHeader = () => {
    const userState = useContext(UserContext);

    const style:CSSProperties = {
        textAlign:"center"
    };

    return (
        userState && userState.user ? <h2 style={style}>Welcome, {userState.user.firstname + ' ' + userState.user.lastname}!</h2> : null
    )
};
export default RoomHeader;

import React from 'react';
import YouTube from "react-youtube";
import ChatPage from "../chat-page/ChatPage";
// @ts-ignore
import s from './roomPage.module.scss';
import RoomHeader from "../../components/room-header/RoomHeader";
import {UserContext} from "../../services/context";

const roomPage: React.FunctionComponent = () => {

    const onPlayerReady = ({target}: any) => {
        target.playVideo();
    };

    return (
        <div className={s.roomPage}>
            <RoomHeader />
            <div className={s.roomPageContainer}>
                <div className={s.roomWrapper} >
                    <YouTube videoId="yimlIZEJwPY"  containerClassName="Video" onReady={onPlayerReady} />
                </div>
                <UserContext.Consumer>
                    {
                        (value)=> <ChatPage user = {value?.user}/>
                    }
                </UserContext.Consumer>
            </div>
        </div>
    )
};
export default roomPage;

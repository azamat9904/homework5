import React from 'react';
import YouTube from "react-youtube";
import ChatPage from "../chat-page/ChatPage";
// @ts-ignore
import s from './roomPage.module.scss';

const roomPage: React.FunctionComponent = () => {

    const onPlayerReady = ({target}: any) => {
        target.playVideo();
    };

    return (
        <div className={s.roomPage}>
            <div className={s.roomWrapper} >
                <YouTube videoId="yimlIZEJwPY"  containerClassName="Video" onReady={onPlayerReady} />
            </div>
            <ChatPage />
        </div>
    )
};
export default roomPage;

import RoomHeader from "../../components/room-header/RoomHeader";
import YouTube from "react-youtube";
import {UserContext} from "../../services/context";
import ChatPage from "../chat-page/ChatPage";
import React, {useState} from "react";
import s from './roomPage.module.scss';
import {useParams} from 'react-router-dom';
import Button from "../../components/button/Button";
import {Simulate} from "react-dom/test-utils";

enum PlayerStates {
    PLAYING = 'PLAYING',
    PAUSED = 'PAUSED',
}

const RoomPage = ()=>{

    const { id } = useParams();

    const [player, setPlayer] = useState<any>(null);

    const [playerState, setPlayerState] = useState<PlayerStates>();

    const onVideoInit = (event: {target: any}) => {
        setPlayer(event.target);
    };

    const toggleVideo = () => {
        if (playerState !== PlayerStates.PLAYING) {
            player?.playVideo();
            setPlayerState(PlayerStates.PLAYING)
        }
        if (playerState === PlayerStates.PLAYING) {
            player?.pauseVideo();
            setPlayerState(PlayerStates.PAUSED)
        }
    };

    const plusTenSec = ()=> setPlayerTime(true);
    const minusTenSec = ()=> setPlayerTime(false);

    const setPlayerTime = (addTime:boolean)=>{
        const skippingTime = 10;
        const duration = player.getDuration();
        let currentTime = player.getCurrentTime();

        if(addTime)
            currentTime = currentTime + skippingTime < duration ? currentTime + 10 : currentTime;

        if(!addTime)
            currentTime = currentTime -10 > 0 ? currentTime -10 : currentTime;

        player.seekTo(currentTime);
    };

    return (
        <div className={s.roomPage}>
            <RoomHeader />
            <div className={s.roomPageContainer}>
                <div className={s.roomWrapper} >
                    <YouTube videoId={id}  containerClassName="Video" onReady={onVideoInit}/>
                    <Button type = "button" onHandler={toggleVideo} className={s.playerBtn} withChildren={true}>
                        <img src={playerState !== PlayerStates.PLAYING ? '/playButton.png' : '/pauseButton.png'} alt="controlButton" className={s.playerImg}/>
                    </Button>
                    <Button type = "button" onHandler={minusTenSec} className={s.playerBtn} withChildren={true}>
                        <img src="/leftArrow.png" alt="controlButton" className={s.playerImg}/>
                    </Button>
                    <Button type = "button" onHandler={plusTenSec} className={s.playerBtn} withChildren={true}>
                        <img src="/rightArrow.png" alt="controlButton" className={s.playerImg}/>
                    </Button>
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
export default RoomPage;

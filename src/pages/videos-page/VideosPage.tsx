import React from "react";
import { Video } from '../../types/interfaces';
import { videosApi } from '../../services/api';
import { Link } from 'react-router-dom';
import {useEffect,useState} from "react";
import s from './Videos.module.scss';

const VideosPage = ()=>{
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        videosApi.getVideos().then(videos => setVideos(videos))
    });

    return (
        <div className={s.Videos}>
            {
                videos.map(video => (
                    <div className={s.videoItem} key={video.id}>
                        <Link to={'/room/'+ video.id}>{video.title}</Link>
                    </div>
                ))
            }
        </div>
    )
};
export default VideosPage;

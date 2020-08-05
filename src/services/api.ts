// @ts-ignore
import axios from 'axios';
import {IPost} from "../types/interfaces";
import {Video} from "../types/interfaces";
import {videosMock} from "./mock";

export const postsApi = {
    getPosts:async ()=>{
        return await axios.get<IPost[]>('https://jsonplaceholder.typicode.com/posts').then(res=>res.data);
    },
    getPost:async(id:number)=>{
        return await axios.get<IPost>(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res=>res.data);
    }
};

export const videosApi = {
    getVideos: () => {
        return new Promise<Video[]>((resolve, reject) => {
            resolve(videosMock);
        });
    }
};

import axios from 'axios';
import {IPost} from "../types/interfaces";

export const postsApi = {
    getPosts:async ()=>{
        return await axios.get<IPost[]>('https://jsonplaceholder.typicode.com/posts').then(res=>res.data);
    },
    getPost:async(id:number)=>{
        return await axios.get<IPost>(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res=>res.data);
    }
};

import React, {useEffect, useState} from 'react';
// @ts-ignore
import s from './PostDetailPage.module.scss';
import {postsApi} from "../../services/api";
import {IPost} from "../../types/interfaces";
import Loader from "../../components/loader/Loader";
import Button from "../../components/button/Button";
import {useHistory} from 'react-router-dom';

const PostDetailPage:React.FunctionComponent<{id:number}> = ({id})=>{

    const [post,setPost] = useState<IPost | null>(null);

    useEffect(()=>{
        postsApi.getPost(id).then(data=>setPost(data)).catch(error=>console.log(error));
    },[id]);
    const history = useHistory();

    const buttonActionHandler = ()=>{
        history.push('/posts');
    };

    return (
        !post ? <Loader/> :
        <div className={s.postDetailContainer}>
            <div className={s.postDetail}>
                <h4 className={s.postTitle}>{post?.title}</h4>
                <p className={s.postContent}>{post?.body}</p>
                <Button text = {'Go Back'} className={s.postDetailButton} onHandler={buttonActionHandler}/>
            </div>
        </div>
    )
};
export default PostDetailPage;

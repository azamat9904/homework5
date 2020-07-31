import React, {useEffect, useState} from 'react';
import s from './PostsPage.module.scss';
import {postsApi} from "../../services/api";
import {IPost} from "../../types/interfaces";
import {Link} from "react-router-dom";
import Loader from "../../components/loader/Loader";

const PostsPage = () => {
    const [posts, setPosts] = useState<IPost[] | null>(null);

    useEffect(() => {
        postsApi.getPosts().then(data => setPosts(data)).catch(error=>console.log(error));
    }, []);

    const postsTemplate = posts?.map(post =>
        <article className={s.postsItem} key={post.id}>
            <h4 className={s.postsTitle}><Link to = {`/posts/${post.id}`}>{post.title}</Link></h4>
            <p className={s.postsText}>{post.body}</p>
        </article>
    );

    return (
        !posts ? <Loader/> :
            <div className={s.postsContainer}>
                <div className={s.posts}>
                    {postsTemplate}
                </div>
            </div>
    )
};
export default PostsPage;

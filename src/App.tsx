import React, {lazy, Suspense} from 'react';
import {Link, Route, Switch} from 'react-router-dom'
// @ts-ignore
import s from './App.module.scss';
import Loader from './components/loader/Loader';

const HomePage = lazy(() => import('./pages/home-page/HomePage'));
const PostsPage = lazy(() => import('./pages/posts-page/PostsPage'));
const PostDetailPage = lazy(()=>import('./pages/post-detail-page/PostDetailPage'));
const Room = lazy(()=>import('./pages/room-page/roomPage'));

function App() {
    return (
        <div className={s.app}>
            <header className={s.appHeader}>
                <nav>
                    <ul className={s.navList}>
                        <li className={s.navItem}>
                            <Link to="/" className={s.navLink}>Home</Link>
                        </li>
                        <li className={s.navItem}>
                            <Link to="/posts" className={s.navLink}>Posts</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className={s.appMain}>
                <Suspense fallback={<Loader/>}>
                    <Switch>
                        <Route exact path="/" render={() => <HomePage/>}/>
                        <Route exact path="/posts" render={() => <PostsPage/>}/>
                        <Route path = "/posts/:id" render = {(routerProps)=><PostDetailPage id = {routerProps.match.params.id}/>} />
                        <Route path = "/room" render = {()=><Room />}/>
                        <Route path="*">
                            <div>Route not found</div>
                        </Route>
                    </Switch>
                </Suspense>
            </main>
        </div>
    );
}

export default App;

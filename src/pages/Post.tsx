import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Post.css';
import { PostContextProvider } from '../store/post/PostContext';
import PostsContainer from '../components/PostsContainer';
import usePostStore from '../store/post/usePostStore';

const Post: React.FC = () => {
  return (
    <PostContextProvider>
      <IonicPost />
    </PostContextProvider>
  );
};

const IonicPost: React.FC = () => {
  const { actions } = usePostStore()

  useEffect(() => {
    actions.dispatch({ type: 'load-posts' })
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blog posts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Posts</IonTitle>
          </IonToolbar>
        </IonHeader>

        <PostsContainer></PostsContainer>

      </IonContent>
    </IonPage>
  );
}

export default Post;

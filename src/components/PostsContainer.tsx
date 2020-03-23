import React from 'react';
import { IonLabel, IonAvatar, IonList, IonItem } from '@ionic/react';
import usePostStore from '../store/post/usePostStore';
import useUserStore from '../store/user/useUserStore';

interface ContainerProps { }

const PostsContainer: React.FC<ContainerProps> = () => {
  const { state: { posts } } = usePostStore()
  const { state: { users } } = useUserStore()

  return (
    <IonList>
      {(posts.length && users.length) &&
        posts.map(post => {
          return (
            <IonItem key={post.id}>
              <IonAvatar slot="start">
                <img src={`https://randomuser.me/api/portraits/men/${post.userId}.jpg`} alt={users[post.userId - 1].username}></img>
              </IonAvatar>
              <IonLabel>
                <h1>{post.title}</h1>
                <IonLabel>{users[post.userId - 1].username}</IonLabel>
              </IonLabel>
            </IonItem>
          )
        })
      }
    </IonList>
  )
}

export default PostsContainer;
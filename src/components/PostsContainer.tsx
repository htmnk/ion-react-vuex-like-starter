import React, { useContext } from 'react';
import { PostContext } from '../store/post/PostContext';
import { IonLabel, IonAvatar, IonList, IonItem } from '@ionic/react';
import { UserContext } from '../store/user/UserContext';
interface ContainerProps { }

const PostsContainer: React.FC<ContainerProps> = () => {
  const { state: { posts } } = useContext(PostContext)
  const { state: { users } } = useContext(UserContext)

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
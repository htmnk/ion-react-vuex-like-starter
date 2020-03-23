import React from 'react';
import './UsersContainer.css';
import { IonList, IonItem, IonAvatar, IonLabel, IonSkeletonText, IonButton } from '@ionic/react';

import { User } from '../models/User';
import useUserStore from '../store/user/useUserStore';

interface ContainerProps { }

const UsersContainer: React.FC<ContainerProps> = () => {
  const { getters: { usersReversed }, state: userState, mutations } = useUserStore()

  return (
    <div className="container">
      {userState.error.isAxiosError && <div>Could not load devices, {userState.error.message} </div>}
      {userState.isLoading ? (
        <IonList>
          {Array(10).fill(0).map((_, i) => {
            return (
              <IonItem key={i}>
                <IonAvatar slot="start">
                  <IonSkeletonText animated />
                </IonAvatar>
                <IonLabel>
                  <h2>
                    <IonSkeletonText animated style={{ width: '50%' }} />
                  </h2>
                  <h3>
                    <IonSkeletonText animated style={{ width: '80%' }} />
                  </h3>
                </IonLabel>
              </IonItem>
            )
          })
          }
        </IonList>
      ) : (
          <IonList>
            {
              usersReversed.map((user: User) => {
                return (
                  <IonItem key={user.id}>
                    <IonAvatar slot="start">
                      <img src={`https://randomuser.me/api/portraits/men/${user.id}.jpg`} alt={user.username}></img>
                    </IonAvatar>
                    <IonLabel>
                      <h2>{user.username}</h2>
                      <h3>{user.website}</h3>
                    </IonLabel>
                  </IonItem>
                )
              })
            }
          </IonList>
        )}
      <IonButton onClick={() => mutations.commit({ type: 'add-user', user: { id: 20, username: 'My New User', website: 'abc.com' } })}>Add user</IonButton>
    </div>
  );
};

export default UsersContainer;

import './User.css';
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import UsersContainer from '../components/UsersContainer';

const User: React.FC = () => {
  return (
    <IonicUser />
  );
};

const IonicUser: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Users</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Users</IonTitle>
          </IonToolbar>
        </IonHeader>
        <UsersContainer></UsersContainer>
      </IonContent>
    </IonPage>
  );
}

export default User;

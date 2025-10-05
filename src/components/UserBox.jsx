import React from 'react';
import styles from './Sidebar.module.css'; 

const currentUser = {
  name: 'John Doe',
  photoUrl: 'https://via.placeholder.com/150/0000FF/808080?text=JD', 
};

/**
 * Component for the User Name and Photo section.
 */
function UserBox() {
  return (
    <div className={styles.userInfoContainer}>
      <hr className={styles.divider} />
      <div className={styles.userInfo} title="User Settings">
        <img 
          src={currentUser.photoUrl} 
          alt={`Profile photo of ${currentUser.name}`} 
          className={styles.userPhoto} 
        />
        <div className={styles.userName}>{currentUser.name}</div>
      </div>
    </div>
  );
}

export default UserBox;
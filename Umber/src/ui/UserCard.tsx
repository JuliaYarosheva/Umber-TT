import {User} from "../models/types.ts";
import styles from '../styles/styles.module.scss'

interface UserCard {
    userData: User
    idx: number
}
export const UserCard = ({userData, idx}: UserCard) => {
    return (
         <div className={styles.userCard} style={{gridArea: `card${idx}`}}>
            <img className={styles.userPhoto} src={userData.picture.large} alt={userData.name.last}/>
            <div className={styles.userInfo}>
                <div>
                    <span><b>Name:</b>&nbsp;</span>
                    <span>{userData.name.first}&nbsp;</span>
                </div>
                <div>
                    <span><b>Phone:</b> {userData.phone}</span>
                </div>
                <div>
                    <span><b>Age:</b> {userData.dob.age}</span>
                </div>
            </div>
        </div>
    )
}
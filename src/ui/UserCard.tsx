import {User} from "../models/types.ts";
import '../styles/styles.scss'

interface UserCard {
    userData: User
    idx: number
}
export const UserCard = ({userData, idx}: UserCard) => {
    return (
         <div className='userCard' style={{gridArea: `card${idx}`}}>
            <img className='userPhoto' src={userData.picture.large} alt={userData.name.last}/>
            <div className='userInfo'>
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
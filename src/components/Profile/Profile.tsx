import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";
import Preloader from "../Common/Preloader/Preloader";
import { ProfileType } from '../../types/types';

export type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner:
    savePhoto: (photo: any) => void
    saveProfile: (profile: ProfileType) => void
}

const Profile: React.FC<PropsType> = (props) => {
    if(!props.profile) {
        return(
            <Preloader/>
        )
    }

    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
                         saveProfile={props.saveProfile}/>
            <PostsContainer />
        </div>
    )
};

export default Profile;
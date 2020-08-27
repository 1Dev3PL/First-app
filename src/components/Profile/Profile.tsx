import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";
import Preloader from "../Common/Preloader/Preloader";
import { ProfileType } from '../../types/types';
import {getProfileSelector, getStatusSelector} from "../../Redux/profile-selectors";
import {useDispatch, useSelector} from "react-redux";
import {getUserIdSelector} from "../../Redux/auth-selectors";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from "../../Redux/profile-reducer";

export type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const Profile: React.FC<PropsType> = (props) => {
    /*const profile = useSelector(getProfileSelector)
    const status = useSelector(getStatusSelector)
    const myId = useSelector(getUserIdSelector)

    const dispatch = useDispatch()

    const getUserProfileDispatch = (userId: number) => dispatch(getUserProfile(userId))
    const getUserStatusDispatch = (userId: number) => dispatch(getUserStatus(userId))
    const updateStatus = (status: string) => dispatch(updateUserStatus(status))
    const savePhotoDispatch = (photo: File) => dispatch(savePhoto(photo))
    const saveProfileDispatch = (profile: ProfileType) => dispatch(saveProfile(profile))

    const refreshProfile = () => {
        let userId: number | null = +this.props.match.params.userId;
        if(!userId) {
            userId = myId;
            if(!userId) {
                props.history.push('/login')
            }
        }
        if(!props.userId) {
            console.error('ID should exist in URL params or in state ("authorizedUserId")')
        } else {
            getUserProfile(props.userId as number);
            getUserStatus(props.userId as number)
        }
    }*/

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
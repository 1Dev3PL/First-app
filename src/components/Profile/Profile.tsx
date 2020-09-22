import React, {useEffect} from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./Posts/PostsContainer";
import Preloader from "../Common/Preloader/Preloader";
import { ProfileType } from '../../types/types';
import {getProfileSelector, getStatusSelector} from "../../Redux/profile-selectors";
import {useDispatch, useSelector} from "react-redux";
import {getUserIdSelector} from "../../Redux/auth-selectors";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from "../../Redux/profile-reducer";
import { useHistory, useParams } from 'react-router-dom';

interface ParamsInterface {
    userId: string
}

const Profile: React.FC = (props) => {
    const profile = useSelector(getProfileSelector)
    const status = useSelector(getStatusSelector)
    const myId = useSelector(getUserIdSelector)

    const dispatch = useDispatch()

    const getUserProfileDispatch = (userId: number) => dispatch(getUserProfile(userId))
    const getUserStatusDispatch = (userId: number) => dispatch(getUserStatus(userId))
    const updateStatus = (status: string) => dispatch(updateUserStatus(status))
    const savePhotoDispatch = (photo: File) => dispatch(savePhoto(photo))
    const saveProfileDispatch = (profile: ProfileType) => dispatch(saveProfile(profile))

    let history = useHistory()
    let params= useParams<ParamsInterface>()

    const refreshProfile = () => {
        let userId: number | null = +params.userId;
        if(!userId) {
            userId = myId;
            if(!userId) {
                history.push('/login')
            }
        }
        if(!userId) {
            console.error('ID should exist in URL params or in state ("authorizedUserId")')
        } else {
            getUserProfileDispatch(userId as number);
            getUserStatusDispatch(userId as number)
        }
    }

    useEffect(() => {
        refreshProfile()
    }, [params.userId])

    if(!profile) {
        return(
            <Preloader/>
        )
    }

    return (
        <div>
            <ProfileInfo profile={profile}
                         status={status}
                         updateStatus={updateStatus}
                         isOwner={!params.userId}
                         savePhoto={savePhotoDispatch}
                         saveProfile={saveProfileDispatch}/>
            <PostsContainer />
        </div>
    )
};

export default Profile;
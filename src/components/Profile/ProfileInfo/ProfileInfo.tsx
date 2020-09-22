import React, {useState} from 'react';
import style from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/userPhoto.png';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: File) => void
    saveProfile: (profile: ProfileType) => any
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    let [editMode, setEditMode] = useState(false);

    const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    };

    const toEditMode = () => {
        setEditMode(true)
    };

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData)
            .then(() => {
                setEditMode(false)
        });
    };

    return (
        <div className={style.info}>
            <img src={profile?.photos.large || userPhoto} className={style.picture} alt={'userPhoto'}/>
            {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}

            {editMode
                ? <ProfileDataForm initialValues={profile as ProfileType} onSubmit={onSubmit} profile={profile}/>
                : <ProfileData profile={profile}
                               isOwner={isOwner}
                               toEditMode={toEditMode}/>}

            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
        </div>
    )
};

type ProfileDataPropsType = {
    profile: ProfileType | null
    isOwner: boolean
    toEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, toEditMode}) => {
    return (
        <div>
            {isOwner &&
            <div>
                <button onClick={toEditMode}>Edit</button>
            </div>}
            <div className={style.fullName}>
                {profile?.fullName}
            </div>
            <div>
                <b>About me</b>: {profile?.aboutMe || ' '}
            </div>
            <div>
                <b>Looking for a job</b>: {profile?.lookingForAJob ? 'yes' : 'no'}
            </div>
            <div>
                <b>My profesional skills</b>: {profile?.lookingForAJobDescription}
            </div>
            <div>
                <b>Contacts</b>: {profile && Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
            })}
            </div>
        </div>
    )
};

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return (
        <div className={style.contact}>
            <b>{contactTitle}</b>: {contactValue}
        </div>
    )
};

export default ProfileInfo;
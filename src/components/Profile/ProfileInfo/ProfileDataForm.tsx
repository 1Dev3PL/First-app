import React from 'react'
import style from './ProfileInfo.module.css';
import errorStyle from '../../Common/FormsControls/FormsControls.module.css'
import {createField, Input, Textarea} from '../../Common/FormsControls/FormsControls';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType | null
}
type ProfileKeysType = Extract<keyof ProfileType, string>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> =
    ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
            </div>
            {error &&
            <div className={errorStyle.formSummaryError}>
                {error}
            </div>}
            <div>
                <b>Full name</b>: {createField<ProfileKeysType>
            ('Full name', 'fullName', Input, [])}
            </div>
            <div>
                <b>About me</b>: {createField<ProfileKeysType>
            ('About me', 'aboutMe', Textarea, [])}
            </div>
            <div>
                <b>Looking for a job</b>: {createField<ProfileKeysType>
            ('', 'lookingForAJob', Input, [], 'checkbox')}
            </div>
            <div>
                <b>My professional
                    skills</b>: {createField<ProfileKeysType>
            ('My Professional skills', 'lookingForAJobDescription', Textarea, [])}
            </div>
            <div>
                <b>Contacts</b>: {profile && Object.keys(profile.contacts).map(key => {
                return (
                    <div className={style.contact} key={key}>
                        {/*Затипизировать!!!*/}
                        <b>{key}</b>: {createField(key, `contacts.${key}`, Input, [])}
                    </div>
                )
            })}
            </div>
        </form>
    )
};

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxForm;
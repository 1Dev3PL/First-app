import React from 'react'
import style from './ProfileInfo.module.css';
import errorStyle from '../../Common/FormsControls/FormsControls.module.css'
import {createField, Input, Textarea} from '../../Common/FormsControls/FormsControls';
import {reduxForm} from 'redux-form';

const ProfileDataForm = ({handleSubmit, profile, error}) => {
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
                <b>Full name</b>: {createField('Full name', 'fullName', Input, [])}
            </div>
            <div>
                <b>About me</b>: {createField('About me', 'aboutMe', Textarea, [])}
            </div>
            <div>
                <b>Looking for a job</b>: {createField(null, 'lookingForAJob', Input, [], 'checkbox')}
            </div>
            <div>
                <b>My professional
                    skills</b>: {createField('My Professional skills', 'lookingForAJobDescription', Textarea, [])}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                return (
                    <div className={style.contact} key={key}>
                        <b>{key}</b>: {createField(key, `contacts.${key}`, Input, [])}
                    </div>
                )
            })}
            </div>
        </form>
    )
};

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxForm;
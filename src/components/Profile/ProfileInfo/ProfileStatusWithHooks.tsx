import React, {useState, useEffect, ChangeEvent} from "react";

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    };

    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}><b>Status</b>: {props.status || 'No Status'}</span>
            </div>
            }
            {editMode &&
            <div onBlur={deactivateEditMode}>
                <input onChange={onStatusChange} autoFocus={true} value={status}/>
            </div>
            }
        </div>
    )
};

export default ProfileStatusWithHooks;
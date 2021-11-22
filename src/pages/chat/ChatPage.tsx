import React, {useEffect, useState} from "react"
import userPhoto from "../../assets/images/userPhoto.png";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {ChatMessageType} from "../../types/types";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../Redux/chat-reducer";
import {selectMessages} from "../../Redux/chat-selectors";

const ChatPage: React.FC = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            <Messages/>
            <ChatForm/>
        </div>
    )
}

const Messages: React.FC = () => {
    const messages = useSelector(selectMessages)

    return (
        <div style={{height: '400px', overflowY: 'auto'}}>
            {messages.map((m, index) => <Message message={m} key={index}/>)}
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div>
            <img src={message.photo || userPhoto} width={50} alt={'ico'}/>
            <h2 style={{display: "inline", marginLeft: '5px'}}>{message.userName}</h2>
            <div>{message.message}</div>
            <hr/>
        </div>
    )
}

const ChatForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    const dispatch = useDispatch()

    const sendMessageHandler = () => {
        if (!message) return

        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div>
            <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)}/>
            <button disabled={false} onClick={sendMessageHandler}>Send</button>
        </div>
    )
}

const ChatPageWithAuthRedirect = withAuthRedirect(ChatPage)

export default ChatPageWithAuthRedirect
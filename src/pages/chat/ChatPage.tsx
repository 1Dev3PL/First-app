import React, {useEffect, useRef, useState} from "react"
import userPhoto from "../../assets/images/userPhoto.png";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../Redux/chat-reducer";
import {selectMessages, selectStatus} from "../../Redux/chat-selectors";
import {ChatMessageAPIType} from "../../api/chat-api";

const ChatPage: React.FC = () => {
    const dispatch = useDispatch()

    const status = useSelector(selectStatus)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            {status === 'error' && <div style={{color: "red"}}>Some error occured!</div>}
            <Messages/>
            <ChatForm/>
        </div>
    )
}

const Messages: React.FC = () => {
    const messages = useSelector(selectMessages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [autoScroll, setAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if ((Math.abs(element.scrollHeight - element.scrollTop) - element.clientHeight) < 300)
        {
            !autoScroll && setAutoScroll(true)
        } else  {
            autoScroll && setAutoScroll(false)
        }
    }

    useEffect(() => {
        if(autoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages])

    return (
        <div style={{height: '400px', overflowY: 'auto'}} onScroll={scrollHandler}>
            {messages.map((m) => <Message message={m} key={m.id}/>)}
            <div ref={messagesAnchorRef}/>
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({message}) => {
    return (
        <div>
            <img src={message.photo || userPhoto} width={50} alt={'ico'}/>
            <h2 style={{display: "inline", marginLeft: '5px'}}>{message.userName}</h2>
            <div>{message.message}</div>
            <hr/>
        </div>
    )
})

const ChatForm: React.FC = () => {
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const status = useSelector(selectStatus)

    const sendMessageHandler = () => {
        if (!message) return

        dispatch(sendMessage(message))
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)}/>
            </div>
            <div>
                <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    )
}

const ChatPageWithAuthRedirect = withAuthRedirect(ChatPage)

export default ChatPageWithAuthRedirect
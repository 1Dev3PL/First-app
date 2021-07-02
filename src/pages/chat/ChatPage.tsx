import React, {useEffect, useState} from "react"

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return (
        <div>
            <Messages/>
            <ChatForm/>
        </div>
    )
}

const Messages: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect( () => {
        wsChannel.addEventListener('message', (e: MessageEvent) => {
            setMessages((prevMessages) => [...prevMessages, ...JSON.parse(e.data)])
        })
    }, [])

    return (
        <div style={{height: '400px', overflowY: 'auto'}}>
            {messages.map((m, index) => <Message message={m} key={index}/>)}
        </div>
    )
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
    return (
        <div>
            <img src={message.photo} width={50} alt={'ico'}/>
            <div>{message.userName}</div>
            <div>{message.message}</div>
            <hr/>
        </div>
    )
}

const ChatForm: React.FC = () => {
    const [message, setMessage] = useState('')

    const sendMessage = () => {
        if(!message) return

        wsChannel.send(message)
        setMessage('')
    }

    return (
        <div>
            <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)}/>
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default ChatPage
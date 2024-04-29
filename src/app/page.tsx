'use client'

import { useCallback, useRef, useState } from 'react'
import { useChatMessages } from '@/app/hooks'
import { ChatInputField, MessageBubble } from '@/app/components'
import styles from './page.module.css'

export default function ChatPage() {
  const [currentQuestion, setCurrentQuestion] = useState('')
  const { messages, requestQuestion, loading } = useChatMessages()
  const messagesRef = useRef<HTMLDivElement>(null)

  const scrollIntoView = useCallback(() => {
    requestAnimationFrame(() =>
      messagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }),
    )
  }, [messagesRef.current])

  const handleQuestionRequest = useCallback(() => {
    requestQuestion(currentQuestion)
    setCurrentQuestion('')
    scrollIntoView()
  }, [requestQuestion, currentQuestion, scrollIntoView])

  const lastMessage = messages.at(-1)

  return (
    <main className={styles.mainContainer}>
      <div ref={messagesRef} className={styles.messagesContainer}>
        {messages.map((m, index) => (
          <MessageBubble
            key={index}
            author={m.role === 'user' ? 'me' : 'AI'}
            type={m.role === 'user' ? 'question' : 'answer'}
            typing={m === lastMessage && m.role === 'assistant' && loading}
          >
            {m.content}
          </MessageBubble>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <ChatInputField
          onQuestionRequest={handleQuestionRequest}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          disabled={loading}
        />
      </div>
    </main>
  )
}

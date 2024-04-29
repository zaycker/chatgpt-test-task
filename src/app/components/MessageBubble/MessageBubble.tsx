'use client'

import React, { PropsWithChildren } from 'react'
import styles from './MessageBubble.module.css'

interface MessageBubbleProps {
  type: 'question' | 'answer'
  author: string
  typing?: boolean
}

const MessageBubble = ({ children, typing, author, type = 'question' }: PropsWithChildren<MessageBubbleProps>) => (
  <div className={`${styles.container} ${type === 'question' ? styles.containerQuestion : ''}`}>
    <div className={styles.messageBubble}>
      <div className={styles.author}>
        {author}
        {typing && <span className={styles.authorTyping}> is typing</span>}
      </div>
      <div className={styles.message}>
        {children}
      </div>
    </div>
  </div>
)
export default MessageBubble

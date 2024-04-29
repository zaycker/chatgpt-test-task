'use client'

import React, { useCallback } from 'react'
import styles from './ChatInputField.module.css'


interface ChatInputFieldProps {
  currentQuestion: string;
  setCurrentQuestion: (question: string) => void;
  onQuestionRequest: () => void;
  disabled?: boolean;
}

const ChatInputField = ({ currentQuestion, setCurrentQuestion, onQuestionRequest, disabled }: ChatInputFieldProps) => {
  const handleQuestionChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuestion(event.target.value)
  }, [setCurrentQuestion])

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!disabled && event.key === 'Enter') {
      onQuestionRequest()
    }
  }, [disabled, onQuestionRequest])

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Ask a question ..."
        className={styles.chatInput}
        onChange={handleQuestionChange}
        onKeyDown={handleKeyDown}
        value={currentQuestion}
        disabled={disabled}
      />
      <button className={styles.searchButton} onClick={disabled ? undefined : onQuestionRequest}>
        <svg className={styles.sendIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>
      </button>
    </div>
  )
}

export default ChatInputField

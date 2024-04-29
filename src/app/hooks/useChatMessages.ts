import { useCallback, useState } from 'react'
import OpenAI from 'openai'
import { useChunkFetch } from './useChunkFetch'

type ChatCompletionMessageParamStringContent = OpenAI.Chat.ChatCompletionMessageParam & {
  content: string
}

// could be taken from env
const CHAT_API_URL = '/api/chat'

export const useChatMessages = () => {
  const [messages, setMessages] = useState<ChatCompletionMessageParamStringContent[]>([])

  const onChunk = useCallback((chunk: string) => {
    setMessages(oldMessages => {
      const lastMessage = oldMessages.at(-1)

      if (lastMessage?.role === 'assistant') {
        return [
          ...oldMessages.slice(0, -1),
          {
            ...lastMessage,
            content: chunk,
          },
        ]
      }

      return oldMessages
    })
  }, [])

  const { doFetch, loading } = useChunkFetch({ url: CHAT_API_URL, onChunk })

  const requestQuestion = useCallback((question: string) => {
    if (loading) {
      return
    }

    setMessages([
      ...messages,
      { role: 'user', content: question },
      { role: 'assistant', content: '' },
    ])

    doFetch(JSON.stringify({
      messages: [
        ...messages,
        { role: 'user', content: question },
      ],
    }))

  }, [doFetch, loading, messages])

  return {
    messages,
    requestQuestion,
    loading,
  }
}

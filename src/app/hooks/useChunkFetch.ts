import { useCallback, useState } from 'react'

interface UseChunkFetchProps {
  url: string,
  onChunk: (chunk: string) => void
}

export const useChunkFetch = ({ url, onChunk }: UseChunkFetchProps) => {
  const [loading, setLoading] = useState(false)

  const doFetch = useCallback(async (body: string) => {
    setLoading(true)

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })

      if (response.body) {
        const reader = response.body.getReader()
        let responseText = ''
        new ReadableStream({
          async start(controller) {
            while (true) {
              const { done, value } = await reader.read()

              if (done) {
                setLoading(false)
                break
              }

              responseText += new TextDecoder().decode(value)
              onChunk(responseText)
              controller.enqueue(value)
            }

            controller.close()
            reader.releaseLock()
          },
        })
      }
    } catch (error) {
      setLoading(false)
      console.error('Fetch error:', error)
    }
  }, [url])

  return { doFetch, loading }
}

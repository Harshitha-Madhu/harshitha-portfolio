import { useState } from "react"
import { askAssistant } from "../ai/assistant"

export default function AIHelp({ onClose }) {
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("AI ready")

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm Madhu's AI portfolio assistant. Ask me about her projects, skills, research, experience, or education.",
    },
  ])

  const askQuestion = async () => {
    const trimmed = question.trim()

    if (!trimmed || loading) return

    setLoading(true)

    setMessages((current) => [
      ...current,
      {
        role: "user",
        text: trimmed,
      },
    ])

    setQuestion("")
    setStatus("Thinking...")

    try {
      const history = messages
        .slice(-6)
        .map((message) => ({
          role:
            message.role === "assistant"
              ? "assistant"
              : "user",
          content: message.text,
        }))

      const answer = await askAssistant(
        trimmed,
        history
      )

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: answer,
        },
      ])

      setStatus("AI ready")
    } catch (error) {
      console.error("AI assistant error:", error)

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text:
            "Sorry, I couldn't process that question right now. Please try again.",
        },
      ])

      setStatus("AI unavailable")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      askQuestion()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="flex h-[650px] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#30363d] px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-[#f0f6fc]">
              AI Help
            </h2>

            <div className="mt-1 flex items-center gap-2 text-xs text-[#8b949e]">
              <span
                className={`h-2 w-2 rounded-full ${
                  loading
                    ? "bg-yellow-400"
                    : status === "AI ready"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />

              <span>{status}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-2 text-xl text-[#8b949e] transition hover:bg-[#21262d] hover:text-[#f0f6fc]"
            aria-label="Close AI Help"
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-6 ${
                  message.role === "user"
                    ? "bg-[#238636] text-white"
                    : "border border-[#30363d] bg-[#161b22] text-[#c9d1d9]"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-lg border border-[#30363d] bg-[#161b22] px-4 py-3 text-sm text-[#8b949e]">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Suggested questions */}
        <div className="border-t border-[#30363d] px-5 py-3">
          <div className="mb-2 text-xs text-[#8b949e]">
            Try asking:
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "What projects has Madhu worked on?",
              "What are her AI/ML skills?",
              "Tell me about her research project.",
              "Where did she intern?",
            ].map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setQuestion(suggestion)}
                className="rounded-md border border-[#30363d] px-3 py-1.5 text-xs text-[#8b949e] transition hover:border-[#58a6ff] hover:text-[#58a6ff]"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-[#30363d] p-4">
          <div className="flex gap-3">
            <textarea
              value={question}
              onChange={(event) =>
                setQuestion(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Ask about Madhu's portfolio..."
              rows={2}
              disabled={loading}
              className="min-h-[52px] flex-1 resize-none rounded-lg border border-[#30363d] bg-[#0d1117] px-4 py-3 text-sm text-[#f0f6fc] outline-none placeholder:text-[#6e7681] focus:border-[#58a6ff] disabled:cursor-not-allowed disabled:opacity-60"
            />

            <button
              type="button"
              onClick={askQuestion}
              disabled={!question.trim() || loading}
              className="self-end rounded-lg bg-[#238636] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2ea043] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "..." : "Ask"}
            </button>
          </div>

          <p className="mt-2 text-xs text-[#6e7681]">
            Press Enter to ask • Shift + Enter for a new line
          </p>
        </div>
      </div>
    </div>
  )
}
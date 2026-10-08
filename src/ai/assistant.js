export async function askAssistant(question, history = []) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
      history,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data?.error || "AI request failed"
    )
  }

  return data.answer
}
import { TypeMessage } from "@/core/schemas/message";

export async function getMessages(query: string) {
  const response = await fetch(query);
  if (!response?.ok) {
    // TODO add err handling in ui
    console.log("Err...");
    return;
  }
  const { messages } = await response.json();
  return messages;
}

export async function sendMessage(
  chat_id: string,
  message: TypeMessage,
  messages: TypeMessage[]
) {
  const data = await fetch(`/api/chats/${chat_id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  }).then((res) => res.json());
  return [...messages!, data.message];
}

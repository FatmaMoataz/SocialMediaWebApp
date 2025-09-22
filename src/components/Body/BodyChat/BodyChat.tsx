import { useSelector } from 'react-redux';
import type { RootState } from '../../../redux/store';

export default function BodyChat() {
  const { messages, loading, error } = useSelector((state: RootState) => state.chat);

  return (
    <div className="flex flex-col gap-3 p-4 overflow-y-auto flex-grow h-full scroll-smooth">
      {messages.length === 0 && (
        <p className="text-gray-400 text-center text-sm">No messages yet...</p>
      )}

      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`p-3 rounded-2xl shadow max-w-[70%] ${
            msg.sender === 'me'
              ? 'bg-green-500 text-white self-end'
              : 'bg-gray-200 text-black self-start'
          }`}
        >
          <p>{msg.text}</p>
          {msg.timestamp && (
            <span className="block text-xs text-gray-600 mt-1 text-right">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      ))}

      {loading && <p className="text-gray-400 text-sm">Bot is typing...</p>}
      {error && <p className="text-red-500 text-sm">Error: {error}</p>}
    </div>
  );
}

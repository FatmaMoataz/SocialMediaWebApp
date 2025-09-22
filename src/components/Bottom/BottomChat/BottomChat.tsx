import { useState } from 'react';
import { MdSend } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { sendMessage, addMessageLocal } from '../../../redux/slices/chatSlice';
import type { AppDispatch } from '../../../redux/store';
import type { Message } from '../../../redux/slices/chatSlice';

interface BottomChatProps {
  userId: string;
}

export default function BottomChat({ userId }: BottomChatProps) {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSend = () => {
    if (message.trim() === '') return;
    
    console.log('Sending message:', message, 'for user:', userId);
    
    try {

      const localMessage: Message = { 
        id: Date.now(), 
        text: message, 
        sender: 'me' as const,
        timestamp: new Date()
      };
      
      dispatch(addMessageLocal(localMessage));
      
      dispatch(sendMessage({ user_id: userId, content: message }));
      
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center mx-8 my-4 p-2 border-gray rounded-full bg-white shadow-md">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-grow outline-none px-4 py-2"
      />
      <button 
        onClick={handleSend} 
        className="text-green-500 cursor-pointer ml-2 p-2 hover:bg-green-50 rounded-full"
        disabled={message.trim() === ''}
      >
        <MdSend size={24} />
      </button>
    </div>
  );
}
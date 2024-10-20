import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addMessage } from '../store/chatSlice';
import { Send } from 'lucide-react';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { sessions, currentSessionId } = useSelector((state: RootState) => state.chat);
  const currentSession = sessions.find(s => s.id === currentSessionId);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    dispatch(addMessage({
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: Date.now(),
    }));

    setInput('');

    // TODO: Integrate with Voiceflow API here
    // For now, we'll simulate a response
    setTimeout(() => {
      dispatch(addMessage({
        id: (Date.now() + 1).toString(),
        content: "This is a simulated AI response. Integrate with Voiceflow API for actual responses.",
        sender: 'ai',
        timestamp: Date.now(),
      }));
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentSession?.messages.map((message) => (
          <div
            key={message.id}
            className={`${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
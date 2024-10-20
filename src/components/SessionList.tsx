import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { createSession, setCurrentSession } from '../store/chatSlice';
import { MessageSquare, Plus } from 'lucide-react';

const SessionList: React.FC = () => {
  const dispatch = useDispatch();
  const { sessions, currentSessionId } = useSelector((state: RootState) => state.chat);

  const handleNewSession = () => {
    dispatch(createSession());
  };

  const handleSelectSession = (sessionId: string) => {
    dispatch(setCurrentSession(sessionId));
  };

  return (
    <div className="p-4">
      <button
        onClick={handleNewSession}
        className="w-full flex items-center justify-center p-2 mb-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <Plus size={20} className="mr-2" />
        New Chat
      </button>
      <ul className="space-y-2">
        {sessions.map((session) => (
          <li key={session.id}>
            <button
              onClick={() => handleSelectSession(session.id)}
              className={`w-full flex items-center p-2 rounded-lg ${
                session.id === currentSessionId
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <MessageSquare size={20} className="mr-2" />
              <span className="truncate">
                {session.messages.length > 0
                  ? session.messages[0].content.substring(0, 20) + '...'
                  : 'New conversation'}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionList;
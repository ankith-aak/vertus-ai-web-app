import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { createSession, setCurrentSession } from '../store/chatSlice';
import ChatInterface from './ChatInterface';
import SessionList from './SessionList';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { sessions, currentSessionId } = useSelector((state: RootState) => state.chat);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (sessions.length === 0) {
      dispatch(createSession());
    } else if (!currentSessionId) {
      dispatch(setCurrentSession(sessions[0].id));
    }
  }, [dispatch, sessions, currentSessionId]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">Versus AI</h2>
          <p className="text-sm text-gray-600">Welcome, {user?.username}</p>
        </div>
        <SessionList />
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <ChatInterface />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
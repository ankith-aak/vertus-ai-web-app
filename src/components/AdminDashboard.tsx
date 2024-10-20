import React, { useState } from 'react';
import { User, UserPlus } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<{ id: string; username: string }[]>([
    { id: '1', username: 'user1' },
    { id: '2', username: 'user2' },
  ]);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual user creation logic
    setUsers([...users, { id: Date.now().toString(), username: newUsername }]);
    setNewUsername('');
    setNewPassword('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
            <h2 className="text-2xl font-semibold mb-4">User Management</h2>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Add New User</h3>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <UserPlus size={20} className="mr-2" />
                  Add User
                </button>
              </form>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Existing Users</h3>
              <ul className="divide-y divide-gray-200">
                {users.map((user) => (
                  <li key={user.id} className="py-4 flex items-center">
                    <User size={20} className="mr-3 text-gray-500" />
                    <span>{user.username}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
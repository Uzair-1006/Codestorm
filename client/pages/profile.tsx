"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import "@/app/globals.css";

export default function Dashboard() {
  const [isClient, setIsClient] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if we are in the browser (client-side)
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('name');
      const role = localStorage.getItem('role');
      if (name && role) {
        setUserName(name);
        setUserRole(role);
      }
      setIsClient(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    router.replace('/login');
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Welcome, {userName} 🎉</h1>
          <p className="text-lg text-gray-600">You're logged in as a {userRole}</p>
        </div>

        {/* Profile Section */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Profile Overview</h2>
          <div className="flex items-center mb-4">
            <div className="h-16 w-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-white">
              {userName.charAt(0)} {/* Display the first letter of user's name as avatar */}
            </div>
            <div className="ml-4">
              <p className="text-lg font-semibold">{userName}</p>
              <p className="text-sm text-gray-600">{userRole}</p>
            </div>
          </div>
          <button
            onClick={() => router.push('/profile')}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            View Profile
          </button>
        </div>

        {/* Logout Section */}
        <div className="flex justify-center">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import "../app/globals.css";

interface Job {
  id: number;
  title: string;
  company: string;
  description: string;
  companyImage: string;
}

export default function HRDashboard() {
  const [isClient, setIsClient] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    console.log('HR Dashboard mounted');
    
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('name');
      const role = localStorage.getItem('role');
      const token = localStorage.getItem('token');

      console.log('HR Dashboard - Auth Check:', { name, role, token });

      if (!token || !name || !role || role.toLowerCase() !== 'hr') {
        console.log('Redirecting to login - Auth failed');
        router.replace('/login');
        return;
      }

      setUserName(name);
      setUserRole(role);
      setIsClient(true);
    }

    const fetchJobs = async () => {
      console.log('Fetching jobs...');
      try {
        const response = await fetch('http://localhost:5000/api/jobs', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Jobs response:', response);
        
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        console.log('Jobs data:', data);
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("There was an issue fetching job data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    router.replace('/login');
  };

  const handleCreateJob = () => {
    router.push('/create-job');
  };

  if (!isClient) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (loading) {
    return <div className="text-center p-4">Loading job data...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Welcome, {userName} 🎉</h1>
            <p className="text-sm text-gray-600">HR Dashboard</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleCreateJob}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Create New Job
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Job Listings Section */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Posted Jobs</h2>
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <div className="mb-4">
                    <img
                      src={job.companyImage || 'https://via.placeholder.com/150'}
                      alt={job.company}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                  <p className="text-md text-gray-700 mt-2 line-clamp-2">{job.description}</p>

                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => router.push(`/job/${job.id}`)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => router.push(`/job/${job.id}/applications`)}
                      className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      View Applications
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No jobs posted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

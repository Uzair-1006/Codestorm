"use client";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import "@/app/globals.css";

// Define a type for the job data
interface Job {
    id: number;
    title: string;
    company: string;
    description: string;
}

export default function Dashboard() {
    const [isClient, setIsClient] = useState(false);
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [jobs, setJobs] = useState<Job[]>([]);  // Type the jobs array as an array of Job objects
    const router = useRouter();

    // Check if we are on the client-side and fetch user data and jobs
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("token");
            const name = localStorage.getItem('name');
            const role = localStorage.getItem('role');
            if (name && role) {
                setUserName(name);
                setUserRole(role);
            }
            setIsClient(true);
        }

        // Fetch job data from the API
        const fetchJobs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/jobs'); // Ensure the endpoint is correct
                const data = await response.json();
                setJobs(data); // Assuming the API returns a list of jobs
            } catch (error) {
                console.error("Error fetching jobs:", error);
                alert("There was an issue fetching job data. Please try again later.");
            }
        };

        fetchJobs(); // Fetch jobs when component mounts
    }, []);

    // Handle user logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        router.replace('/login');
    };

    const applyForJob = async (jobId:any) => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            alert("You must be logged in to apply for a job.");
            window.location.href = "/login";
            return;
          }
      
          // Validate jobId format
          if (!/^[a-f\d]{24}$/i.test(jobId)) {
            alert("Invalid job ID.");
            return;
          }
      
          const response = await fetch(`http://localhost:5000/api/apply/${jobId}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to apply for the job");
          }
      
          const data = await response.json();
          alert(data.message || "Application submitted successfully!");
        } catch (error) {
          console.error("Error applying for job:", error);
          alert(error.message || "There was an issue applying for the job. Please try again.");
        }
      };      
    if (!isClient) {
        return <div className="text-center p-4">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">

                {/* Header Section with Welcome and Profile Edit Button */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Welcome, {userName} 🎉</h1>
                        <p className="text-sm text-gray-600">You're logged in as a {userRole}</p>
                    </div>
                    <button
                        onClick={() => router.push('/profile')}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition"
                    >
                        Edit Profile
                    </button>
                </div>

                {/* Job Listings Section with Grid Layout */}
                <div className="bg-gray-100 p-6 rounded-xl shadow-md mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Listings</h2>
                    {jobs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {jobs.map((job:any) => (
                                <div
                                    key={job._id} // Use _id instead of id
                                    className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out transform hover:scale-105"
                                >
                                    <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
                                    <p className="text-sm text-gray-600">{job.company}</p>
                                    <p className="text-md text-gray-700 mt-2">{job.description}</p>

                                    <div className="mt-4 flex justify-between items-center">
                                        <button
                                            onClick={() => router.push(`/job/${job._id}`)} // Use _id here as well
                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            View More
                                        </button>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => applyForJob(job._id)}  // Use _id here too
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 text-sm"
                                            >
                                                Apply
                                            </button>
                                            <button
                                                onClick={() => alert("Reporting spam...")}
                                                className="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 text-sm"
                                            >
                                                Report Spam
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    ) : (
                        <p className="text-gray-600">No jobs available at the moment.</p>
                    )}
                </div>

                {/* Logout Section */}
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 text-sm"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

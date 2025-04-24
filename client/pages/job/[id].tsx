// pages/job/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import "@/app/globals.css";

interface Job {
  id: number;
  title: string;
  company: string;
  description: string;
  companyImage: string;
}

export default function JobDetails() {
  const router = useRouter();
  const { id } = router.query;  // Fetch the job ID from the URL
  const [job, setJob] = useState<Job | null>(null);

  // Fetch job details based on ID from API
  useEffect(() => {
    if (id) {
      const fetchJobDetails = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/jobs/${id}`);
          const data = await response.json();
          setJob(data);  // Set the fetched job data
        } catch (error) {
          console.error("Error fetching job details:", error);
        }
      };

      fetchJobDetails();
    }
  }, [id]);

  if (!job) {
    return <div className="text-center p-4">Loading job details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center mb-6">
          <div className="mr-6">
            <img
              src={job.companyImage || 'https://via.placeholder.com/150'}
              alt={job.company}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">{job.title}</h1>
            <p className="text-lg text-gray-700">{job.company}</p>
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Job Description</h2>
          <p className="text-md text-gray-700">{job.description}</p>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => router.push('/dashboard')} // Navigate back to the dashboard
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 text-sm"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => alert("Applying for job...")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 text-sm"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

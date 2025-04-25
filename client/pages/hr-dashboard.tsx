"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import "../app/globals.css";

interface DashboardData {
    totalCandidates: number;
    shortlisted: number;
    selected: number;
    rejected: number;
}

interface Job {
    _id: string;
    title: string;
    description: string;
    status: string;
    datePosted: string;
}

interface Candidate {
    _id: string;
    name: string;
    email: string;
    resumeUrl: string;
    status: string;
}

const HrDashboard = () => {
    const router = useRouter();
    const [userName, setUserName] = useState<string | null>(null);
    const [isClient, setIsClient] = useState(false);
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const name = localStorage.getItem('name');
        const role = localStorage.getItem('role');
        const token = localStorage.getItem('token');

        if (!token || !name || !role || role.toLowerCase() !== 'hr') {
            router.replace('/login');
            return;
        }

        setUserName(name);
        setIsClient(true);

        const fetchDashboardData = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/hr/dashboard`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.statusText}`);
                }

                const contentType = res.headers.get('Content-Type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await res.json();
                    setDashboardData(data);
                } else {
                    throw new Error("Expected JSON response");
                }
            } catch (error) {
                console.error(error);
                setError("Failed to fetch dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        const fetchJobs = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/hr/jobs', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                setJobs(data);
            } catch (err) {
                console.error("Job fetch error:", err);
            }
        };

        fetchDashboardData();
        fetchJobs();
    }, [router]);

    const handleLogout = () => {
        localStorage.clear();
        router.replace('/login');
    };

    const handleCreateJob = () => {
        router.push('/create-job');
    };

    const handleProfile = () => {
        router.push('/profile');
    };

    const openModal = async (job: Job) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:5000/api/hr/jobs/${job._id}/candidates`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            // Get the raw response text first to debug
            const text = await res.text();
            console.log("Raw response:", text); // Log the raw response to inspect

            // Try parsing the response as JSON
            try {
                const data = JSON.parse(text);
                setCandidates(data);
                setSelectedJob(job);
                setShowModal(true);
            } catch (err) {
                console.error("Failed to parse response as JSON", err);
                setError("Failed to load candidates. Please try again later.");
            }
        } catch (err) {
            console.error("Failed to fetch candidates", err);
            setError("Failed to fetch candidates. Please try again later.");
        }
    };

    const updateCandidateStatus = async (candidateId: string, status: string) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:5000/api/hr/candidates/${candidateId}/status`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                setCandidates(candidates.map(c => c._id === candidateId ? { ...c, status } : c));
            }
        } catch (err) {
            console.error("Status update failed", err);
        }
    };

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
    if (!isClient) return null;

    return (
        <div className={`min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800 ${showModal ? 'overflow-hidden' : ''}`}>
            {/* Navbar */}
            <nav className="bg-blue-600 p-4 flex justify-between items-center text-white shadow-md">
                <h1 className="text-xl font-bold">TrueHire HR Dashboard</h1>
                <div className="flex gap-3">
                    <button onClick={handleCreateJob} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">Create Job</button>
                    <button onClick={handleProfile} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">Profile</button>
                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">Logout</button>
                </div>
            </nav>

            {/* Greeting and Summary */}
            <div className={`px-8 py-6 ${showModal ? 'filter blur-sm pointer-events-none' : ''}`}>
                <h2 className="text-3xl font-semibold mb-4">Welcome, {userName}</h2>
                {error && <p className="text-red-600">{error}</p>}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <SummaryCard title="Total Candidates" value={dashboardData?.totalCandidates} />
                    <SummaryCard title="Shortlisted" value={dashboardData?.shortlisted} />
                    <SummaryCard title="Selected" value={dashboardData?.selected} />
                    <SummaryCard title="Rejected" value={dashboardData?.rejected} />
                </div>

                {/* Posted Jobs */}
                <h3 className="text-2xl font-semibold mb-4">Posted Jobs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.length === 0 ? <p>No jobs posted yet.</p> : jobs.map(job => (
                        <div key={job._id} className="bg-white rounded shadow p-4 transition hover:shadow-lg">
                            <h4 className="text-xl font-bold mb-2">{job.title}</h4>
                            <p className="mb-2 text-gray-700">{job.description}</p>
                            <p className="text-sm text-gray-500">Posted on: {new Date(job.datePosted).toLocaleDateString('en-IN')}</p>
                            <p className="text-sm text-blue-600 mt-1">Status: {job.status}</p>
                            <button onClick={() => openModal(job)} className="mt-3 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">View Candidates</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Candidates Modal */}
            {showModal && selectedJob && (
                <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-[95%] max-w-3xl p-6 shadow-xl overflow-y-auto max-h-[90vh]">
                        <h3 className="text-xl font-bold mb-4">Applicants for {selectedJob.title}</h3>
                        {candidates.length === 0 ? (
                            <p>No candidates applied yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {candidates.map(candidate => (
                                    <div key={candidate._id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                        <h4 className="text-lg font-semibold">{candidate.name}</h4>
                                        <p className="text-sm text-gray-600">Email: {candidate.email}</p>
                                        <p className="text-sm text-gray-600">Status: {candidate.status}</p>
                                        <div className="mt-2 flex gap-4">
                                            <a href={candidate.resumeUrl} target="_blank" className="text-blue-600 underline">View Resume</a>
                                            <a
                                                href={`http://localhost:5000/api/hr/candidates/${candidate._id}/download-resume`}
                                                target="_blank"
                                                className="text-green-600 underline"
                                                download
                                            >
                                                Download Resume
                                            </a>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            <button onClick={() => updateCandidateStatus(candidate._id, 'Shortlisted')} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Shortlist</button>
                                            <button onClick={() => updateCandidateStatus(candidate._id, 'Selected')} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">Select</button>
                                            <button onClick={() => updateCandidateStatus(candidate._id, 'Rejected')} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Reject</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <button onClick={() => setShowModal(false)} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded mt-6">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const SummaryCard = ({ title, value }: { title: string, value?: number }) => (
    <div className="bg-white p-4 rounded-lg shadow-md">
        <h5 className="text-lg font-semibold">{title}</h5>
        <p className="text-3xl font-bold text-blue-600">{value ?? 'Loading...'}</p>
    </div>
);

export default HrDashboard;

"use client";
import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../utils/api';

export default function CreateJobPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [salary, setSalary] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [companyImage, setCompanyImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setCompanyImage(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !company || !description || !salary) {
      setError("All fields are required.");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError("You must be logged in to create a job.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('company', company);
    formData.append('description', description);
    formData.append('salary', salary);
    if (companyImage) {
      formData.append('companyImage', companyImage);
    }

    try {
      const response = await api.post('/jobs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      setLoading(false);
      router.push('/hr-dashboard');
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.message || 'Failed to create job posting. Please try again later.');
      console.error('Error creating job:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create New Job</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">Job Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="salary" className="block text-sm font-medium text-gray-600">Salary</label>
            <input
              type="number"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
              required
              min="0"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="company" className="block text-sm font-medium text-gray-600">Company</label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">Job Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
              rows={4}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="companyImage" className="block text-sm font-medium text-gray-600">Company Logo (Optional)</label>
            <input
              type="file"
              id="companyImage"
              onChange={handleFileChange}
              accept="image/*"
              className="mt-2"
            />
          </div>

          <div className="flex gap-4 justify-end">
            <button
              type="submit"
              className={`px-6 py-2 bg-blue-600 text-white rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Creating Job...' : 'Create Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

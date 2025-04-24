import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import "@/app/globals.css";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'candidate', // default role is 'candidate'
    id: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (resume) {
        data.append('resume', resume);
      }

      await axios.post('http://localhost:5000/api/auth/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Registered successfully!');
      router.push('/login');
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-24 px-6 py-10 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Register to TrueHire</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input name="name" placeholder="Full Name" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="id" placeholder="Government ID / Unique ID" onChange={handleChange} required className="w-full p-2 border rounded" />

        {/* Role Dropdown */}
        <select name="role" onChange={handleChange} value={formData.role} className="w-full p-2 border rounded">
          <option value="candidate">Candidate</option>
          <option value="hr">HR</option>
        </select>

        <input name="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Register</button>
      </form>

      {/* Login Link */}
      <p className="mt-4 text-center text-sm text-gray-600">
        Already registered?{' '}
        <Link href="/login" className="text-green-600 hover:underline font-medium">
          Login here
        </Link>
      </p>
    </div>
  );
}

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import "@/app/globals.css";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "", role: "candidate" });
  const [loading, setLoading] = useState(false);  // Loading state
  const router = useRouter();

  const handleChange = (e: any) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);  // Start loading

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      console.log('Login response:', res.data);
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);
      
      console.log('Stored role:', localStorage.getItem('role'));
      
      alert("Login successful!");
      
      const userRole = res.data.role?.toLowerCase();
      console.log('User role for redirection:', userRole);
      
      if (userRole.toLowerCase() === 'hr') {
        console.log('Redirecting to HR dashboard');
        window.location.href = '/hr-dashboard';
      } else {
        console.log('Redirecting to regular dashboard');
        window.location.href = '/dashboard';
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);  // Stop loading after request
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login to TrueHire</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              I am a:
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="candidate">Candidate</option>
              <option value="hr">HR</option>
            </select>
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            disabled={loading}  // Disable the button while loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

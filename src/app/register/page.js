"use client"
import { useState } from "react";
import { Lock, Mail, Eye, EyeOff, LogIn, User, Building, Phone } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Email Validation
  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setError("Invalid email format");
    } else {
      setError("");
    }
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
   

    // Phone number validation (must be exactly 10 digits and numeric)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    // Email validation (must be a valid email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        setLoading(false);
        return;
      }

      setSuccess("User registered successfully!");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setLoading(false);
      setError("Something went wrong, please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.log("Error occurred in Google sign-in", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-8 text-center bg-indigo-600">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-indigo-200 mt-2">Sign up to get started</p>
        </div>
        <div className="p-8">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" name="fullName" placeholder="Full Name" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" onChange={handleChange} required />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input type="email" name="email" placeholder="Email address" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" onChange={handleChange} required />
            </div>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" name="company" placeholder="Company" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" onChange={handleChange} required />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" name="phone" placeholder="Phone Number" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" onChange={handleChange} required />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" onChange={handleChange} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input type={showPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" onChange={handleChange} required />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700">{loading ? <LoadingSpinner /> : "Create Account"}</button>
          </form>
          <div className="text-center mt-6">
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center bg-white border border-gray-300 py-3 rounded-lg shadow-sm hover:shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1"
            >
              {/* Google Icon */}
              <div className="w-6 h-6 mr-3">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">Sign in with Google</span>
            </button>
          </div>
          <p className="text-center mt-4 text-sm text-gray-600">Already have an account? <button onClick={() => router.push("/login")} className="text-indigo-600 font-semibold">Sign in</button></p>
        </div>
      </div>
    </div>
  );
}
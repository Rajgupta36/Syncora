"use client"
import type React from "react"
import { useState } from "react"
import { useSignUpUserMutation } from "@/state/api"
import { useAppDispatch } from "@/app/redux"
import { setCredentials } from "@/state/authSlice"
import { useRouter } from "next/navigation"
import type { ApiError } from "@/app/types/types"
import { User, AtSign, Phone, Lock, AlertCircle } from "lucide-react"

type Props = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export const Signup = ({ setLogin }: Props) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [signupUser] = useSignUpUserMutation()
  const dispatch = useAppDispatch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!username || !email || !phone || !password || !confirmPassword) {
      setError("All fields are required.")
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      setLoading(false)
      return
    }

    try {
      const result = await signupUser({ username, email, password }).unwrap()
      dispatch(setCredentials({ user: result.user, token: result.token }))

      router.push("/dashboard")
      router.refresh()
    } catch (error: unknown) {
      const err = error as ApiError
      const errorMessage = err.data?.error || err.error || "Signup failed. Please try again."
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden flex">
        {/* Left side - Welcome message */}
        <div className="w-2/5 bg-indigo-500 p-12 text-white flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-6">Hello, Welcome!</h1>
          <p className="text-indigo-100 mb-8">Already have an account?</p>
          <button
            onClick={() => setLogin(true)}
            className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-indigo-500 transition-colors duration-300 font-medium"
          >
            Login
          </button>
        </div>

        {/* Right side - Signup form */}
        <div className="w-3/5 p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Sign Up</h2>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
              <AlertCircle size={18} />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-100 rounded-lg px-4 py-3 pl-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Full Name"
                />
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-100 rounded-lg px-4 py-3 pl-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Email Address"
                />
                <AtSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-100 rounded-lg px-4 py-3 pl-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Phone Number"
                />
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-100 rounded-lg px-4 py-3 pl-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Password"
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-gray-100 rounded-lg px-4 py-3 pl-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Confirm Password"
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg transition-colors duration-300 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-8">
            <p className="text-center text-gray-500 mb-4">or sign up with social platforms</p>
            <div className="flex justify-center space-x-4">
              <button className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </button>
              <button className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </button>
              <button className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </button>
              <button className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-600"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

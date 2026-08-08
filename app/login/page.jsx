'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { login, signup } from './actions'

function AuthForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const urlMessage = searchParams.get('message')
  const [message, setMessage] = useState(urlMessage)
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    const action = isLogin ? login : signup
    
    try {
      const result = await action(formData)
      
      if (result?.error) {
        setMessage(result.error)
      } else if (result?.success) {
        if (isLogin) {
          router.push('/')
        } else {
          setMessage(result.success)
        }
      }
    } catch (err) {
      setMessage('An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md bg-white p-8 border border-neutral-200">
      <h1 className="text-3xl font-bold text-[#1a1a1a] mb-8 font-['Syne'] text-center">
        {isLogin ? 'LOG IN' : 'CREATE ACCOUNT'}
      </h1>
      
      {message && (
        <div className={`p-4 mb-6 text-sm font-['DM_Sans'] text-center border ${message.includes('verify') ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
          {message}
        </div>
      )}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#1a1a1a] font-['DM_Sans']">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="px-4 py-3 border border-neutral-300 focus:outline-none focus:border-[#1a1a1a] transition-colors bg-[#f8f8f8] text-[#1a1a1a] font-['DM_Sans']"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-[#1a1a1a] font-['DM_Sans']">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="px-4 py-3 border border-neutral-300 focus:outline-none focus:border-[#1a1a1a] transition-colors bg-[#f8f8f8] text-[#1a1a1a] font-['DM_Sans']"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 bg-[#1a1a1a] text-[#f8f8f8] font-bold font-['DM_Sans'] uppercase tracking-wider py-4 hover:bg-neutral-800 transition-colors border border-transparent disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-neutral-500 hover:text-[#1a1a1a] font-['DM_Sans'] transition-colors"
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
        </button>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col items-center justify-center p-4">
      <Suspense fallback={<div className="font-['DM_Sans'] text-neutral-500">Loading...</div>}>
        <AuthForm />
      </Suspense>
    </div>
  )
}

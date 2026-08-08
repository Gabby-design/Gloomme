import { login } from './actions'

export default function LoginPage({ searchParams }) {
  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 border border-neutral-200">
        <h1 className="text-3xl font-bold text-[#1a1a1a] mb-8 font-['Syne'] text-center">
          OWNER LOGIN
        </h1>
        <form className="flex flex-col gap-4">
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
            formAction={login}
            className="mt-4 bg-[#1a1a1a] text-[#f8f8f8] font-bold font-['DM_Sans'] uppercase tracking-wider py-4 hover:bg-neutral-800 transition-colors border border-transparent"
          >
            Log In
          </button>
          {searchParams?.message && (
            <p className="mt-4 text-sm text-red-600 text-center font-['DM_Sans']">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

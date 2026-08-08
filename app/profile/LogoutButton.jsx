'use client';

import { logout } from '../login/actions';

export default function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="border border-[#1a1a1a] text-[#1a1a1a] bg-transparent hover:bg-[#1a1a1a] hover:text-[#f8f8f8] px-6 py-2 text-xs font-bold uppercase tracking-widest transition-colors font-sans"
    >
      Log Out
    </button>
  );
}

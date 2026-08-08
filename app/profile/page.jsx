import { redirect } from 'next/navigation';
import { createClient } from '../../utils/supabase/server';
import { Navbar } from '../../src/components/Navbar';
import LogoutButton from './LogoutButton';

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/login');
  }

  // Fetch orders
  // Assuming there's an `orders` table linked to user.id or user.email
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col text-[#1a1a1a]">
      <Navbar searchQuery="" setSearchQuery={() => {}} setIsSizeGuideOpen={() => {}} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="font-['Syne'] text-4xl font-bold mb-2">My Account</h1>
            <p className="font-['DM_Sans'] text-neutral-500">
              Welcome back, {user.email}
            </p>
          </div>
          <LogoutButton />
        </div>

        <div className="border border-neutral-200 bg-white p-8">
          <h2 className="font-['Syne'] text-2xl font-bold mb-6">Order History</h2>
          
          {!orders || orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-['DM_Sans'] text-neutral-500 mb-6">
                You haven't placed any orders yet.
              </p>
              <a 
                href="/" 
                className="inline-block bg-[#1a1a1a] text-[#f8f8f8] px-8 py-3 font-sans font-bold uppercase tracking-widest text-sm hover:bg-neutral-800 transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-['DM_Sans']">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="py-4 font-semibold">Order ID</th>
                    <th className="py-4 font-semibold">Date</th>
                    <th className="py-4 font-semibold">Status</th>
                    <th className="py-4 font-semibold text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-4 font-mono text-sm">{order.id.slice(0, 8)}</td>
                      <td className="py-4 text-neutral-600">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4">
                        <span className="bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full">
                          {order.status || 'Processing'}
                        </span>
                      </td>
                      <td className="py-4 text-right font-medium">
                        ₦{order.total_amount?.toLocaleString() || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

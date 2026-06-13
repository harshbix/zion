
import { useOrders } from '@/services/order-context';
import { formatCurrency } from '@/services/utils';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Package, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';

export default function AccountPage() {
  const { orders, setActiveOrder } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleTrackClick = (order: typeof orders[0]) => {
    setActiveOrder(order);
    navigate('/order-tracking');
  };

  return (
    <div className="bg-[#FFFBF5] min-h-screen pt-28 pb-24 text-stone-800">
      <div className="container-premium max-w-6xl">

        {/* Page Title */}
        <div className="mb-12 border-b border-stone-200/50 pb-6">
          <h1 className="font-sans-luxury text-stone-900 text-3xl md:text-5xl font-bold">
            Customer Portal
          </h1>
          <p className="text-stone-500 font-sans-luxury text-xs tracking-wider uppercase mt-1">
            Manage your credentials, addresses, and track orders in progress.
          </p>
        </div>

        {/* Account Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Panel: Profile Info & Address (col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Contact details */}
            <div className="bg-white border border-stone-200 p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-stone-50 border border-stone-100 text-amber-700">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans-luxury text-base font-bold text-stone-900 leading-tight">
                    {user?.displayName || 'John Doe'}
                  </h3>
                  <span className="text-[10px] font-sans-luxury text-stone-400 uppercase tracking-wider">Premium Member</span>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-stone-100 text-xs font-sans-luxury text-stone-600 tracking-wider">
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase mb-0.5">EMAIL</span>
                  <span className="text-stone-950 font-bold">{user?.email || 'john.doe@example.com'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block uppercase mb-0.5">PHONE</span>
                  <span className="text-stone-950 font-bold">+255 789 123 456</span>
                </div>
              </div>
            </div>

            {/* Address book */}
            <div className="bg-white border border-stone-200 p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-2 text-stone-950 font-sans-luxury text-xs font-bold uppercase tracking-widest">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>Default Delivery Location</span>
              </div>
              <div className="text-xs leading-relaxed text-stone-500" style={{ fontFamily: 'Inter' }}>
                <p className="font-bold text-stone-800 uppercase font-sans-luxury text-[10px] tracking-wider">Home (Address 1)</p>
                <p className="mt-1">Forest Area, Plot 42, Near Hospital</p>
                <p>Mbeya CBD, Tanzania</p>
              </div>
            </div>
          </div>

          {/* Right Panel: Order History (col-span-8) */}
          <div className="lg:col-span-8 bg-white border border-stone-200 p-6 md:p-8">
            <h2 className="font-sans-luxury text-xl font-bold text-stone-950 border-b border-stone-100 pb-4 mb-6">
              Order History & Statuses
            </h2>

            {orders.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <Package className="w-10 h-10 text-stone-300 mx-auto" />
                <p className="font-sans-luxury text-base italic text-stone-500">You have no order history yet.</p>
                <Link to="/shop" className="premium-btn-primary">Shop Now</Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="border border-stone-100 p-6 space-y-4 hover:border-amber-600/30 transition-all bg-stone-50/20">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-stone-100 pb-3">
                      <div>
                        <span className="font-sans-luxury text-[9px] text-stone-400 block uppercase tracking-wider">ORDER ID</span>
                        <span className="font-sans-luxury text-sm font-black text-stone-900">{order.id}</span>
                      </div>
                      <div>
                        <span className="font-sans-luxury text-[9px] text-stone-400 block uppercase tracking-wider sm:text-right">DATE ORDERED</span>
                        <span className="font-sans-luxury text-xs font-bold text-stone-600 block sm:text-right">{order.date}</span>
                      </div>
                      <div>
                        <span className="font-sans-luxury text-[9px] text-stone-400 block uppercase tracking-wider sm:text-right">DELIVERY STATUS</span>
                        <span className={`inline-block font-sans-luxury text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${order.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'delivering'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800 pulse-glow-amber'
                          }`}>
                          {order.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>

                    {/* Order items summary list */}
                    <div className="space-y-2">
                      {order.items.map((item: any, iIdx: number) => (
                        <div key={iIdx} className="flex justify-between text-xs text-stone-600" style={{ fontFamily: 'Inter' }}>
                          <span>
                            {item.name} x{item.quantity} {item.selectedSize && `(${item.selectedSize})`}
                          </span>
                          <span className="font-bold text-stone-800">{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Footer / actions */}
                    <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <span className="text-[9px] font-sans-luxury text-stone-400 block uppercase tracking-wider">TOTAL PAID</span>
                        <span className="font-sans-luxury text-base font-black text-stone-950">{formatCurrency(order.total)}</span>
                      </div>

                      {order.status !== 'delivered' ? (
                        <button
                          onClick={() => handleTrackClick(order)}
                          className="bg-amber-600 hover:bg-stone-950 text-white font-sans-luxury text-[9px] font-bold uppercase tracking-widest px-5 py-3.5 transition-all flex items-center gap-1.5"
                        >
                          LIVE TRACK ORDER <ExternalLink className="w-3 h-3" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleTrackClick(order)}
                          className="border border-stone-200 text-stone-700 hover:bg-stone-950 hover:text-white font-sans-luxury text-[9px] font-bold uppercase tracking-widest px-5 py-3.5 transition-all flex items-center gap-1.5"
                        >
                          VIEW RECEIPT & DETAILS <Clock className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

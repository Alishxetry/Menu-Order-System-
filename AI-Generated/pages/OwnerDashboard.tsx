import { useNavigate } from 'react-router-dom';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { DollarSign, ShoppingBag, TrendingUp, Calculator } from 'lucide-react';
import { mockUsers } from '@/lib/menuData';

const getStatusClass = (status: string) => {
  switch (status) {
    case 'pending': return 'cafe-badge-pending';
    case 'preparing': return 'cafe-badge-preparing';
    case 'ready': return 'cafe-badge-completed';
    case 'delivering': return 'cafe-badge-delivering';
    case 'completed': return 'cafe-badge-completed';
    default: return 'cafe-badge-pending';
  }
};

export function OwnerDashboard() {
  const { currentUser, orders, setUser } = useStore();
  const navigate = useNavigate();

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const avgOrder = totalOrders > 0 ? totalSales / totalOrders : 0;

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  if (!currentUser) {
    navigate('/login/owner');
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: 'var(--gradient-hero)' }}>
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display text-gradient">Owner Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: DollarSign, label: 'Total Sales', value: `$${totalSales.toFixed(2)}` },
            { icon: ShoppingBag, label: 'Total Orders', value: totalOrders },
            { icon: TrendingUp, label: 'Net Profit', value: `$${(totalSales * 0.5).toFixed(2)}` },
            { icon: Calculator, label: 'Avg Order', value: `$${avgOrder.toFixed(2)}` },
          ].map((stat) => (
            <div key={stat.label} className="cafe-card p-5">
              <stat.icon className="w-7 h-7 text-primary mb-2" />
              <h3 className="text-muted-foreground text-sm">{stat.label}</h3>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* All Orders */}
        <div className="cafe-card p-6 mb-8">
          <h2 className="text-xl font-display text-primary mb-4">All Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-cafe-gold">Date</th>
                  <th className="text-left py-3 px-2 text-cafe-gold">Order ID</th>
                  <th className="text-left py-3 px-2 text-cafe-gold">Type</th>
                  <th className="text-left py-3 px-2 text-cafe-gold">Items</th>
                  <th className="text-left py-3 px-2 text-cafe-gold">Total</th>
                  <th className="text-left py-3 px-2 text-cafe-gold">Status</th>
                  <th className="text-left py-3 px-2 text-cafe-gold">Assigned</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-border/50">
                    <td className="py-3 px-2">{order.date}</td>
                    <td className="py-3 px-2">#{order.id}</td>
                    <td className="py-3 px-2">
                      {order.isDelivery ? '🚚 Delivery' : `🍽️ ${order.tableNo}`}
                    </td>
                    <td className="py-3 px-2 max-w-xs truncate">{order.items}</td>
                    <td className="py-3 px-2">${order.total.toFixed(2)}</td>
                    <td className="py-3 px-2">
                      <span className={`cafe-badge ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">{order.waiter || order.rider || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Staff Performance */}
        <div className="cafe-card p-6">
          <h2 className="text-xl font-display text-primary mb-4">Staff Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-cafe-gold">Name</th>
                  <th className="text-left py-3 px-2 text-cafe-gold">Role</th>
                  <th className="text-left py-3 px-2 text-cafe-gold">UID</th>
                  <th className="text-left py-3 px-2 text-cafe-gold">Orders</th>
                  <th className="text-left py-3 px-2 text-cafe-gold">Rating</th>
                </tr>
              </thead>
              <tbody>
                {[...mockUsers.waiters, ...mockUsers.riders].map((staff, i) => (
                  <tr key={staff.uid} className="border-b border-border/50">
                    <td className="py-3 px-2">{staff.name}</td>
                    <td className="py-3 px-2">
                      {mockUsers.waiters.includes(staff) ? 'Waiter' : 'Rider'}
                    </td>
                    <td className="py-3 px-2">{staff.uid}</td>
                    <td className="py-3 px-2">{12 + i * 4}</td>
                    <td className="py-3 px-2">⭐⭐⭐⭐⭐</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

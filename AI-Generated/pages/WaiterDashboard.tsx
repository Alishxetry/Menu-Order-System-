import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Star } from 'lucide-react';

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

export function WaiterDashboard() {
  const { currentUser, orders, setUser } = useStore();
  const navigate = useNavigate();

  const waiterOrders = orders.filter(
    (o) => o.waiter === currentUser?.name && !o.isDelivery
  );

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  if (!currentUser) {
    navigate('/login/waiter');
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: 'var(--gradient-hero)' }}>
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display text-gradient">Waiter Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="px-4 py-2 bg-muted rounded-lg">👤 {currentUser.name}</span>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: DollarSign, label: 'Total Earnings', value: '$203.50' },
            { icon: TrendingUp, label: 'Commission', value: '$125.50' },
            { icon: Star, label: 'Tips Received', value: '$78.00' },
          ].map((stat) => (
            <div key={stat.label} className="cafe-card p-6">
              <stat.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="text-muted-foreground text-sm">{stat.label}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="cafe-card p-6">
          <h2 className="text-xl font-display text-primary mb-4">Current Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-cafe-gold">Table</th>
                  <th className="text-left py-3 px-2 text-cafe-gold">Order ID</th>
                  <th className="text-left py-3 px-2 text-cafe-gold">Items</th>
                  <th className="text-left py-3 px-2 text-cafe-gold">Total</th>
                  <th className="text-left py-3 px-2 text-cafe-gold">Status</th>
                </tr>
              </thead>
              <tbody>
                {waiterOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border/50">
                    <td className="py-3 px-2">{order.tableNo}</td>
                    <td className="py-3 px-2">#{order.id}</td>
                    <td className="py-3 px-2 max-w-xs truncate">{order.items}</td>
                    <td className="py-3 px-2">${order.total.toFixed(2)}</td>
                    <td className="py-3 px-2">
                      <span className={`cafe-badge ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {waiterOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      No orders assigned yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex gap-4">
          <Link to="/menu">
            <Button variant="cafeGold">Take New Order</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

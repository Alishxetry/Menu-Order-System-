import { useNavigate } from 'react-router-dom';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Package, CheckCircle, Bike } from 'lucide-react';
import { toast } from 'sonner';

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

export function RiderDashboard() {
  const { currentUser, orders, setUser, assignRider, updateOrderStatus } = useStore();
  const navigate = useNavigate();

  const availableOrders = orders.filter((o) => o.isDelivery && o.status === 'ready' && !o.rider);
  const myDeliveries = orders.filter((o) => o.rider === currentUser?.name);
  const activeDelivery = myDeliveries.find((o) => o.status === 'delivering');

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleAcceptOrder = (orderId: number) => {
    if (currentUser) {
      assignRider(orderId, currentUser.name);
      toast.success('Order accepted! Start your delivery.');
    }
  };

  const handleCompleteDelivery = (orderId: number) => {
    updateOrderStatus(orderId, 'completed');
    toast.success('Delivery completed! Great job.');
  };

  if (!currentUser) {
    navigate('/login/rider');
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: 'var(--gradient-hero)' }}>
      <div className="container max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display text-gradient">Rider Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {currentUser.name}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="cafe-card p-5 text-center">
            <Package className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{myDeliveries.filter(o => o.status === 'completed').length}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
          <div className="cafe-card p-5 text-center">
            <Bike className="w-8 h-8 text-cafe-warning mx-auto mb-2" />
            <p className="text-2xl font-bold">{activeDelivery ? 1 : 0}</p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div className="cafe-card p-5 text-center">
            <CheckCircle className="w-8 h-8 text-cafe-success mx-auto mb-2" />
            <p className="text-2xl font-bold">$45.50</p>
            <p className="text-sm text-muted-foreground">Today's Earnings</p>
          </div>
        </div>

        {/* Active Delivery */}
        {activeDelivery && (
          <div className="cafe-card p-6 mb-8 border-2 border-primary">
            <div className="flex items-center gap-2 mb-4">
              <Bike className="w-6 h-6 text-primary animate-pulse" />
              <h2 className="text-xl font-display font-semibold">Active Delivery</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Delivery Address</p>
                  <p className="text-muted-foreground">{activeDelivery.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">{activeDelivery.customerName}</p>
                  <p className="text-muted-foreground">{activeDelivery.customerPhone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Order #{activeDelivery.id}</p>
                  <p className="text-muted-foreground">{activeDelivery.items}</p>
                </div>
              </div>
              <Button 
                variant="cafe" 
                size="lg" 
                className="w-full mt-4"
                onClick={() => handleCompleteDelivery(activeDelivery.id)}
              >
                Mark as Delivered
              </Button>
            </div>
          </div>
        )}

        {/* Available Orders */}
        <div className="cafe-card p-6 mb-8">
          <h2 className="text-xl font-display text-primary mb-4">Available for Pickup</h2>
          {availableOrders.length > 0 ? (
            <div className="space-y-4">
              {availableOrders.map((order) => (
                <div key={order.id} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.items}</p>
                    </div>
                    <span className={`cafe-badge ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    {order.address}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary">${order.total.toFixed(2)}</span>
                    <Button 
                      variant="cafeGold" 
                      size="sm"
                      onClick={() => handleAcceptOrder(order.id)}
                      disabled={!!activeDelivery}
                    >
                      Accept Delivery
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No orders available for delivery right now
            </p>
          )}
        </div>

        {/* Delivery History */}
        <div className="cafe-card p-6">
          <h2 className="text-xl font-display text-primary mb-4">Recent Deliveries</h2>
          <div className="space-y-3">
            {myDeliveries.filter(o => o.status === 'completed').map((order) => (
              <div key={order.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <span className="cafe-badge cafe-badge-completed">Completed</span>
              </div>
            ))}
            {myDeliveries.filter(o => o.status === 'completed').length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No completed deliveries yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

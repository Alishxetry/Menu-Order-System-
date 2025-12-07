import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, X, ShoppingCart, Truck, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { menuData } from '@/lib/menuData';
import { useStore } from '@/lib/store';
import { toast } from 'sonner';

export function Menu() {
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    placeOrder,
    isDeliveryMode,
    setDeliveryMode,
    deliveryInfo,
    setDeliveryInfo,
  } = useStore();

  const [activeCategory, setActiveCategory] = useState(Object.keys(menuData)[0]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast.error('Please add items to your order');
      return;
    }

    if (isDeliveryMode && (!deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.address)) {
      toast.error('Please fill in delivery details');
      return;
    }

    const order = placeOrder();
    if (order) {
      toast.success(`Order placed! Order ID: #${order.id}`);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: 'var(--gradient-hero)' }}>
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <Link to="/">
              <Button variant="ghost" size="sm" className="mb-2">← Back to Home</Button>
            </Link>
            <h1 className="text-4xl font-display text-gradient">Our Menu</h1>
          </div>

          {/* Order Type Toggle */}
          <div className="flex gap-2 bg-muted rounded-xl p-1">
            <button
              onClick={() => setDeliveryMode(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                !isDeliveryMode ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Store className="w-4 h-4" />
              Dine In
            </button>
            <button
              onClick={() => setDeliveryMode(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isDeliveryMode ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Truck className="w-4 h-4" />
              Delivery
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
              {Object.keys(menuData).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <div className="grid sm:grid-cols-2 gap-4">
              {menuData[activeCategory]?.map((item, index) => (
                <div
                  key={item.id}
                  className="cafe-card cafe-card-hover p-5 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <h3 className="text-lg font-display font-semibold mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary">${item.price.toFixed(2)}</span>
                    <Button
                      variant="cafe"
                      size="sm"
                      onClick={() => {
                        addToCart(item);
                        toast.success(`${item.name} added to cart`);
                      }}
                    >
                      <Plus className="w-4 h-4" /> Add
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="cafe-card p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingCart className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-display font-semibold">Your Order</h2>
              </div>

              {/* Delivery Info */}
              {isDeliveryMode && (
                <div className="mb-6 p-4 bg-muted/50 rounded-lg space-y-3">
                  <h4 className="font-medium text-sm">Delivery Details</h4>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={deliveryInfo.name}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, name: e.target.value })}
                    className="cafe-input text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={deliveryInfo.phone}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                    className="cafe-input text-sm"
                  />
                  <textarea
                    placeholder="Delivery Address"
                    value={deliveryInfo.address}
                    onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                    className="cafe-input text-sm resize-none"
                    rows={2}
                  />
                </div>
              )}

              {cart.length > 0 ? (
                <>
                  <div className="space-y-3 max-h-80 overflow-y-auto mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="p-3 bg-muted/30 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{item.name}</span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 rounded bg-muted flex items-center justify-center hover:bg-muted/80"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 rounded bg-muted flex items-center justify-center hover:bg-muted/80"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 mb-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button variant="cafe" size="lg" className="w-full" onClick={handlePlaceOrder}>
                    Place Order
                  </Button>
                </>
              ) : (
                <p className="text-center text-muted-foreground py-8 italic">
                  No items added yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Bike, DollarSign, Clock, MapPin, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const benefits = [
  { icon: DollarSign, title: 'Competitive Pay', desc: 'Earn per delivery plus tips and bonuses' },
  { icon: Clock, title: 'Flexible Hours', desc: 'Work whenever you want, be your own boss' },
  { icon: MapPin, title: 'Local Routes', desc: 'Deliver in your neighborhood, no long distances' },
  { icon: CheckCircle, title: 'Weekly Payouts', desc: 'Get paid weekly directly to your account' },
];

export function RiderSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    vehicleType: 'motorcycle',
    licenseNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Application submitted! We will contact you within 24 hours.');
    navigate('/');
  };

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'var(--gradient-hero)' }}>
      <div className="container max-w-5xl mx-auto">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6">← Back to Home</Button>
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Bike className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display text-gradient mb-4">
            Become a Greens Cafe Rider
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our delivery team and earn money on your own schedule. 
            Deliver delicious food to happy customers in your area.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title} 
              className="cafe-card p-5 text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <benefit.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-1">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Application Form */}
        <div className="cafe-card p-8 md:p-10 max-w-2xl mx-auto">
          <h2 className="text-2xl font-display text-center text-primary mb-8">
            Apply Now
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="cafe-input"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="cafe-input"
                  placeholder="+977-XXXXXXXXXX"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="cafe-input"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="cafe-input"
                placeholder="Your current address"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Vehicle Type</label>
                <select
                  value={formData.vehicleType}
                  onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  className="cafe-input"
                >
                  <option value="motorcycle">Motorcycle</option>
                  <option value="scooter">Scooter</option>
                  <option value="bicycle">Bicycle</option>
                  <option value="car">Car</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">License Number</label>
                <input
                  type="text"
                  value={formData.licenseNumber}
                  onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  className="cafe-input"
                  placeholder="Driver's license number"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" variant="cafe" size="xl" className="w-full">
                Submit Application
              </Button>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Already a rider? <Link to="/login/rider" className="text-primary hover:underline">Login here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

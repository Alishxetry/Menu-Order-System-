import { Link } from 'react-router-dom';
import { Coffee, Wifi, Car, Music, Leaf, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const facilities = [
  { icon: Wifi, title: 'Free WiFi', desc: 'High-speed internet for all customers' },
  { icon: Car, title: 'Parking', desc: 'Ample parking space available' },
  { icon: Coffee, title: 'AC Dining', desc: 'Comfortable air-conditioned seating' },
  { icon: Music, title: 'Live Music', desc: 'Weekend live performances' },
  { icon: Leaf, title: 'Organic Options', desc: 'Fresh, locally sourced ingredients' },
  { icon: Users, title: 'Family Friendly', desc: 'Kids menu and play area' },
];

export function Landing() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-hero)' }}>
      <div className="container max-w-5xl mx-auto px-4 py-12 md:py-20">
        {/* Logo */}
        <div className="flex justify-center mb-8 animate-float">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
            <Coffee className="w-20 h-20 md:w-24 md:h-24 text-primary-foreground" />
          </div>
        </div>

        {/* Main Content Card */}
        <div className="cafe-card p-8 md:p-12 animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-display text-center text-gradient mb-4">
            Greens Cafe
          </h1>
          <p className="text-xl text-center text-muted-foreground italic mb-8">
            "Where Every Sip Tells a Story"
          </p>

          <p className="text-lg text-center text-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Welcome to Greens Cafe, your perfect destination for exceptional coffee, 
            delicious food, and warm hospitality. Established in 2025, we serve the 
            community with passion and dedication.
          </p>

          {/* Owner Info */}
          <div className="bg-muted/50 rounded-xl p-6 md:p-8 border-l-4 border-accent mb-10">
            <h3 className="text-2xl font-display text-primary mb-6">
              🏢 About Our Establishment
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Owner', value: 'Prashant Shrestha' },
                { label: 'Co-Owner', value: 'Lana Lodes' },
                { label: 'Restaurant Code', value: 'MC-0484' },
                { label: 'Contact', value: '+977-9705397845' },
                { label: 'Location', value: 'Manakamana college side, Birtamode Jhapa' },
                { label: 'Operating Hours', value: '7:00 AM - 10:00 PM' },
              ].map((item) => (
                <div key={item.label} className="p-3">
                  <span className="text-primary font-semibold block mb-1">{item.label}</span>
                  <span className="text-foreground/80">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {facilities.map((facility) => (
              <div
                key={facility.title}
                className="cafe-card cafe-card-hover p-5 text-center"
              >
                <facility.icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                <h4 className="font-semibold text-accent mb-1">{facility.title}</h4>
                <p className="text-sm text-muted-foreground">{facility.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button variant="cafe" size="xl">
                View Menu & Order
              </Button>
            </Link>
            <Link to="/role-select">
              <Button variant="cafeOutline" size="xl">
                Staff Login
              </Button>
            </Link>
          </div>

          {/* Footer Links */}
          <div className="flex justify-center gap-6 mt-10 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/rider" className="hover:text-primary transition-colors">
              Become a Rider
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

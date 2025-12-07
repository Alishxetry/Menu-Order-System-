import { Link } from 'react-router-dom';
import { User, UtensilsCrossed, Briefcase, Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';

const roles = [
  {
    icon: User,
    title: 'Customer',
    desc: 'Browse menu and place orders',
    path: '/menu',
    buttonText: 'Continue as Customer',
  },
  {
    icon: UtensilsCrossed,
    title: 'Waiter',
    desc: 'Manage customer orders',
    path: '/login/waiter',
    buttonText: 'Login as Waiter',
  },
  {
    icon: Briefcase,
    title: 'Owner',
    desc: 'View all orders and analytics',
    path: '/login/owner',
    buttonText: 'Login as Owner',
  },
  {
    icon: Bike,
    title: 'Rider',
    desc: 'Deliver orders to customers',
    path: '/login/rider',
    buttonText: 'Login as Rider',
  },
];

export function RoleSelect() {
  return (
    <div className="min-h-screen py-16 px-4" style={{ background: 'var(--gradient-hero)' }}>
      <div className="container max-w-5xl mx-auto">
        <Link to="/" className="inline-block mb-8">
          <Button variant="ghost" size="sm">← Back to Home</Button>
        </Link>

        <h1 className="section-title text-gradient">Select Your Role</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, index) => (
            <div
              key={role.title}
              className="cafe-card cafe-card-hover p-8 text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <role.icon className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-display font-semibold text-cafe-gold mb-3">
                {role.title}
              </h2>
              <p className="text-muted-foreground mb-6">{role.desc}</p>
              <Link to={role.path}>
                <Button variant="cafeGold" className="w-full">
                  {role.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

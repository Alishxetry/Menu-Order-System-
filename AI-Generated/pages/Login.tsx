import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { mockUsers } from '@/lib/menuData';
import { toast } from 'sonner';

export function Login() {
  const { role } = useParams<{ role: 'waiter' | 'owner' | 'rider' }>();
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  
  const [uid, setUid] = useState('');
  const [password, setPassword] = useState('');

  const roleConfig = {
    waiter: {
      title: 'Waiter Login',
      users: mockUsers.waiters,
      redirect: '/dashboard/waiter',
      demo: { uid: '1001234567', password: 'waiter123' },
    },
    owner: {
      title: 'Owner Login',
      users: mockUsers.owners,
      redirect: '/dashboard/owner',
      demo: { uid: '2000000001', password: 'owner123' },
    },
    rider: {
      title: 'Rider Login',
      users: mockUsers.riders,
      redirect: '/dashboard/rider',
      demo: { uid: '3001234567', password: 'rider123' },
    },
  };

  const config = roleConfig[role || 'waiter'];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = config.users.find(
      (u) => u.uid === uid && u.password === password
    );
    
    if (user) {
      setUser({ name: user.name, uid: user.uid, role: role || 'waiter' });
      toast.success(`Welcome back, ${user.name}!`);
      navigate(config.redirect);
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ background: 'var(--gradient-hero)' }}>
      <div className="cafe-card p-8 w-full max-w-md animate-fade-in">
        <Link to="/role-select">
          <Button variant="ghost" size="sm" className="mb-4">← Back</Button>
        </Link>

        <h1 className="text-3xl font-display text-center text-gradient mb-8">
          {config.title}
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">User ID (UID)</label>
            <input
              type="text"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              className="cafe-input"
              placeholder="Enter your UID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="cafe-input"
              placeholder="Enter your password"
            />
          </div>

          <Button type="submit" variant="cafe" size="lg" className="w-full">
            Login
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Demo: UID: {config.demo.uid} | Pass: {config.demo.password}
          </p>
        </form>
      </div>
    </div>
  );
}

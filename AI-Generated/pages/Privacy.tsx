import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function Privacy() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'var(--gradient-hero)' }}>
      <div className="container max-w-3xl mx-auto">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6">← Back to Home</Button>
        </Link>

        <div className="cafe-card p-8 md:p-12">
          <h1 className="text-4xl font-display text-gradient mb-8">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground/80">
            <p className="text-muted-foreground italic">
              Last updated: December 7, 2025
            </p>

            <section>
              <h2 className="text-2xl font-display text-primary mt-8 mb-4">1. Information We Collect</h2>
              <p>
                At Greens Cafe, we collect information you provide directly to us, such as when you
                place an order, create an account, or contact us for support. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Name and contact information (phone number, email, delivery address)</li>
                <li>Order history and preferences</li>
                <li>Payment information (processed securely through our payment partners)</li>
                <li>Feedback and correspondence</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display text-primary mt-8 mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Process and deliver your orders</li>
                <li>Send order confirmations and updates</li>
                <li>Improve our menu and services</li>
                <li>Respond to your comments and questions</li>
                <li>Send promotional offers (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display text-primary mt-8 mb-4">3. Information Sharing</h2>
              <p>
                We do not sell or rent your personal information to third parties. We may share your
                information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Delivery partners to fulfill your orders</li>
                <li>Payment processors to complete transactions</li>
                <li>Service providers who assist our operations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display text-primary mt-8 mb-4">4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-primary mt-8 mb-4">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display text-primary mt-8 mb-4">6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Greens Cafe</strong><br />
                Manakamana college side, Birtamode Jhapa<br />
                Phone: +977-9705397845<br />
                Email: privacy@greenscafe.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

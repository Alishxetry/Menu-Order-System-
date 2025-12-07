import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function Terms() {
  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'var(--gradient-hero)' }}>
      <div className="container max-w-3xl mx-auto">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6">← Back to Home</Button>
        </Link>

        <div className="cafe-card p-8 md:p-12">
          <h1 className="text-4xl font-display text-gradient mb-8">Terms of Service</h1>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground/80">
            <p className="text-muted-foreground italic">
              Last updated: December 7, 2025
            </p>

            <section>
              <h2 className="text-2xl font-display text-primary mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Greens Cafe services, you agree to be bound by these Terms of
                Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-primary mt-8 mb-4">2. Orders and Payments</h2>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>All prices are listed in USD and include applicable taxes</li>
                <li>Orders are subject to availability</li>
                <li>Payment must be made at the time of order</li>
                <li>We reserve the right to refuse any order</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display text-primary mt-8 mb-4">3. Delivery Policy</h2>
              <p>For delivery orders:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Delivery times are estimates and may vary</li>
                <li>Delivery area is limited to designated zones</li>
                <li>Minimum order value may apply</li>
                <li>Customer must be available to receive the order</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display text-primary mt-8 mb-4">4. Cancellations and Refunds</h2>
              <p>
                Orders can be cancelled within 5 minutes of placement. After preparation begins,
                cancellations may not be possible. Refunds are processed within 5-7 business days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-primary mt-8 mb-4">5. Allergen Information</h2>
              <p>
                Please inform our staff of any allergies before ordering. While we take precautions,
                we cannot guarantee that our food is free from allergens.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-primary mt-8 mb-4">6. Limitation of Liability</h2>
              <p>
                Greens Cafe shall not be liable for any indirect, incidental, or consequential
                damages arising from the use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-primary mt-8 mb-4">7. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of our
                services constitutes acceptance of updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-primary mt-8 mb-4">8. Contact</h2>
              <p>
                For questions about these Terms of Service, contact us at:<br />
                Phone: +977-9705397845<br />
                Email: legal@greenscafe.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-20 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background p-8 md:p-12 rounded-2xl shadow-sm border border-border"
        >
          <h1 className="font-display text-4xl font-bold mb-8 text-primary">Privacy Policy</h1>
          
          <div className="font-body text-muted-foreground space-y-6 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, phone number, and shipping address.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to process your orders, communicate with you about your account, and improve our services. We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Data Security</h2>
              <p>
                Sri Sudharsana Tex takes the security of your data seriously. We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Cookies</h2>
              <p>
                Our website uses cookies to enhance your browsing experience and analyze site traffic. You can choose to disable cookies through your browser settings, though this may affect certain features of the site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <section className="pt-8 border-t border-border">
              <p>If you have any questions about our Privacy Policy, please contact us at hello@srisudharsanatex.com.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

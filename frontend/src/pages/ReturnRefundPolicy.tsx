import { motion } from "framer-motion";

const ReturnRefundPolicy = () => {
  return (
    <div className="min-h-screen py-20 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background p-8 md:p-12 rounded-2xl shadow-sm border border-border"
        >
          <h1 className="font-display text-4xl font-bold mb-8 text-primary">Return & Refund Policy</h1>
          
          <div className="font-body text-muted-foreground space-y-6 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Return Eligibility</h2>
              <p>
                Since our products are traditional handloom items (sarees, veshtis, etc.), returns are only accepted in the following cases:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Manufacturing defects (holes, major weaving errors).</li>
                <li>Wrong product delivered.</li>
                <li>Damage during transit.</li>
              </ul>
              <p className="mt-4 italic">Note: Minor irregularities in weave or color are characteristics of handloom products and are not considered defects.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Return Window</h2>
              <p>
                You must initiate a return request within **7 days** of receiving your order. Requests made after this period will not be entertained.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. Process for Returns</h2>
              <p>
                To initiate a return, please email us at hello@srisudharsanatex.com or contact us via WhatsApp with your order ID and clear photos of the defect/issue. Once approved, you will be provided with instructions on how to ship the item back to us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. Refunds</h2>
              <p>
                Once we receive and inspect the returned item, we will notify you of the approval or rejection of your refund. Approved refunds will be processed to your original payment method within **7-10 business days**.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Exchanges</h2>
              <p>
                We only replace items if they are defective or damaged. If you need to exchange it for the same item, contact us via our official support channels.
              </p>
            </section>

            <section className="pt-8 border-t border-border">
              <p>For further assistance, please contact us at +91 75488 00581.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;

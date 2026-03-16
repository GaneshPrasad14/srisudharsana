import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { API_URL } from "@/data/products";

const CartSidebar = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { user } = useAuth();
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setUserDetails({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;

    if (!showCheckoutForm) {
      setShowCheckoutForm(true);
      return;
    }

    // Basic validation
    if (!userDetails.name || !userDetails.email || !userDetails.phone || !userDetails.address) {
      alert("Please fill in all the details.");
      return;
    }

    try {
      // 1. Create order on the backend
      const response = await fetch(`${API_URL}/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: cartTotal,
          currency: 'INR',
        }),
      });

      const order = await response.json();

      if (!order.id) {
        throw new Error('Failed to create order');
      }

      // 2. Initialize Razorpay Checkout
      const options = {
        key: 'rzp_live_SNodyXcJclhuSc', // Use the live key provided
        amount: order.amount,
        currency: order.currency,
        name: 'Sri Sudharsana Tex',
        description: 'Purchase of Handwoven Textiles',
        order_id: order.id,
        handler: async function (response: any) {
          // 3. Verify payment on the backend
          const verifyRes = await fetch(`${API_URL}/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userDetails,
              amount: cartTotal,
              items: items
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            alert('Payment Successful! Confirmation emails have been sent.');
            setIsCartOpen(false);
            setShowCheckoutForm(false);
            // Here you would typically clear the cart and redirect to a success page
          } else {
            alert('Payment Verification Failed!');
          }
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.phone,
        },
        theme: {
          color: '#333333',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong during checkout. Please try again.');
    }
  };

  const whatsappOrder = () => {
    const text = items
      .map((item) => `${item.product.name} x${item.quantity} - ₹${item.product.price * item.quantity}`)
      .join("\n");
    const message = `Hi! I'd like to order:\n\n${text}\n\nTotal: ₹${cartTotal.toLocaleString()}`;
    window.open(`https://wa.me/917548800581?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-display text-xl font-semibold">
                {showCheckoutForm ? "Checkout Details" : `Shopping Bag (${items.length})`}
              </h2>
              <button onClick={() => {
                setIsCartOpen(false);
                setShowCheckoutForm(false);
              }}><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {!showCheckoutForm ? (
                <>
                  {items.length === 0 ? (
                    <p className="text-center text-muted-foreground font-body py-12">Your bag is empty</p>
                  ) : (
                    items.map((item) => (
                      <div key={item.product.id} className="flex gap-4 bg-card rounded-lg p-3">
                        <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display text-sm font-semibold truncate">{item.product.name}</h4>
                          <p className="text-accent font-body font-semibold text-sm">₹{item.product.price.toLocaleString()}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 rounded bg-secondary"><Minus size={14} /></button>
                            <span className="font-body text-sm w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 rounded bg-secondary"><Plus size={14} /></button>
                            <button onClick={() => removeFromCart(item.product.id)} className="ml-auto text-destructive"><Trash2 size={14} /></button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </>
              ) : (
                <div className="space-y-4 font-body animate-in fade-in slide-in-from-right-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={userDetails.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-border rounded-md bg-transparent"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={userDetails.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-border rounded-md bg-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={userDetails.phone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-border rounded-md bg-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Shipping Address</label>
                    <textarea
                      name="address"
                      value={userDetails.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-2 border border-border rounded-md bg-transparent resize-none"
                      placeholder="Enter your full address"
                    />
                  </div>
                  <button 
                    onClick={() => setShowCheckoutForm(false)}
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    ← Back to bag
                  </button>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 border-t border-border space-y-3">
                <div className="flex justify-between font-body">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-semibold text-lg">₹{cartTotal.toLocaleString()}</span>
                </div>
                <Button
                  className="w-full bg-primary text-primary-foreground font-body tracking-wide"
                  onClick={handleCheckout}
                >
                  {showCheckoutForm ? "Pay Now" : "Proceed to Checkout"}
                </Button>
                {!showCheckoutForm && (
                  <Button variant="outline" className="w-full font-body tracking-wide border-accent text-accent" onClick={whatsappOrder}>
                    Order via WhatsApp
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;

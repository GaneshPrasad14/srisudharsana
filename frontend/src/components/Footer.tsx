import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, MessageCircle, MapPin, Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-2xl font-bold mb-4">
            <span className="text-gold-gradient">Sri Sudharsana</span> Tex
          </h3>
          <p className="font-body text-sm opacity-80 leading-relaxed">
            Preserving the rich heritage of South Indian handloom textiles. Every weave tells a story of tradition, craftsmanship, and cultural pride.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 font-body text-sm opacity-80">
            <Link to="/category/sarees" className="hover:opacity-100 transition-opacity">Sarees</Link>
            <Link to="/category/veshti" className="hover:opacity-100 transition-opacity">Veshti</Link>
            <Link to="/category/thundu" className="hover:opacity-100 transition-opacity">Thundu</Link>
            <Link to="/culture" className="hover:opacity-100 transition-opacity">Our Heritage</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Policies</h4>
          <div className="flex flex-col gap-2 font-body text-sm opacity-80">
            <Link to="/privacy-policy" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
            <Link to="/return-policy" className="hover:opacity-100 transition-opacity">Return & Refund Policy</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Get in Touch</h4>
          <div className="flex flex-col gap-3 font-body text-sm opacity-80">
            <span className="flex items-center gap-2"><Mail size={14} /> hello@srisudharsanatex.com</span>
          </div>
          <div className="flex gap-4 mt-4">
            <a href="https://www.instagram.com/silk_cotton_dhothis_sarees?igsh=bzM5aG1haGtrMG9x" target="_blank" rel="noopener noreferrer">
              <Instagram size={20} className="opacity-80 hover:opacity-100 cursor-pointer transition-opacity" />
            </a>
            <a href="https://www.facebook.com/share/14ZM9ffmsGe/" target="_blank" rel="noopener noreferrer">
              <Facebook size={20} className="opacity-80 hover:opacity-100 cursor-pointer transition-opacity" />
            </a>
            <a href="https://youtube.com/@trendingsareesanddhothis?si=ANG9ShN4ly8SzB0_" target="_blank" rel="noopener noreferrer">
              <Youtube size={20} className="opacity-80 hover:opacity-100 cursor-pointer transition-opacity" />
            </a>
            <a href="https://whatsapp.com/channel/0029VaggowqHltYHumMmT40g" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={20} className="opacity-80 hover:opacity-100 cursor-pointer transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10 text-center py-4 font-body text-xs opacity-60">
      © 2026 Sri Sudharsana Tex. All rights reserved. Handcrafted with love in Tamil Nadu.
    </div>
  </footer>
);

export default Footer;

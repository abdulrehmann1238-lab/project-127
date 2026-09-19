import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-[#FAF8F3] min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-semibold tracking-[0.18em] text-[#8A7A5C]">
            Flagship &amp; Inquiries
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1C1A] mt-1">
            Contact the Clubhouse
          </h1>
          <p className="text-xs sm:text-sm text-[#57564E] mt-2">
            Connect with our concierge clothiers, inquire regarding bespoke corporate orders, or schedule a fitting at our Monterey peninsula studios.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Flagship Locations Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E4E0D6] shadow-sm space-y-6">
              <div>
                <h3 className="font-serif text-lg text-[#1C1C1A] mb-1">Flagship Studio</h3>
                <p className="text-xs text-[#8B897D]">Carmel-by-the-Sea</p>
                <div className="mt-3 space-y-2 text-xs text-[#57564E]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#1F3B2C] shrink-0 mt-0.5" />
                    <span>Ocean Avenue &amp; Lincoln Street, Carmel-by-the-Sea, CA 93921</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#1F3B2C] shrink-0" />
                    <span>(831) 555-0144</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#1F3B2C] shrink-0" />
                    <span>Mon – Sun: 10:00 AM – 6:00 PM PST</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E4E0D6]">
                <h3 className="font-serif text-lg text-[#1C1C1A] mb-1">Clubhouse Pro Shop Partner</h3>
                <p className="text-xs text-[#8B897D]">Pebble Beach Golf Links</p>
                <div className="mt-3 space-y-2 text-xs text-[#57564E]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#1F3B2C] shrink-0 mt-0.5" />
                    <span>17-Mile Drive, Pebble Beach, CA 93953</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#1F3B2C] shrink-0" />
                    <span>concierge@elevatedgreen.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-[#E4E0D6] shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#2E6B47] mx-auto" />
                <h3 className="font-serif text-2xl text-[#1C1C1A]">Message Transmitted</h3>
                <p className="text-xs text-[#57564E] max-w-sm mx-auto">
                  Thank you for contacting The Elevated Green. Our clubhouse team will reply within 4 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary px-6 py-2 text-xs uppercase tracking-wider mt-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <h3 className="font-serif text-xl text-[#1C1C1A]">General Inquiries</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#57564E] block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Marcus Whitfield"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#57564E] block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="marcus@countryclub.org"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#57564E] block mb-1">Inquiry Subject</label>
                  <select className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]">
                    <option>Product Sizing &amp; Material Guidance</option>
                    <option>Corporate Tournament Wardrobe Order</option>
                    <option>Order Status or Delivery Question</option>
                    <option>Press &amp; Editorial Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#57564E] block mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your inquiry..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-3.5 text-xs uppercase tracking-wider font-semibold shadow-md flex items-center justify-center gap-2"
                >
                  <span>Transmit Message</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

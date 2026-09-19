import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Clock, MapPin, Calendar, ArrowRight } from 'lucide-react';

export const Concierge: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: 'Sarah Jenkins',
    email: 'sarah.jenkins@elevatedgreen.com',
    phone: '(831) 555-0192',
    handicap: '8.4',
    homeClub: 'Pebble Beach Golf Links',
    appointmentType: 'bespoke_apparel', // bespoke_apparel, custom_glove_monogram, tournament_wardrobe
    preferredLocation: 'pebble_beach_clubhouse', // pebble_beach, carmel_flagship, private_residence
    preferredDate: '2026-10-15',
    notes: 'Preparing for member-guest tournament at Cypress Point next month. Seeking full 4-day wardrobe allocation including waterproof outer layers and monogrammed gloves.'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF8F3] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F3B2C]/10 text-[#1F3B2C] text-xs font-semibold uppercase tracking-[0.15em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B8916A]" />
            <span>White-Glove Clubhouse Service</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1C1A] leading-tight font-medium">
            Private Fitting &amp; Concierge Wardrobe
          </h1>
          <p className="text-xs sm:text-sm text-[#57564E] mt-3 leading-relaxed">
            Experience bespoke golf tailoring, custom cabretta leather sizing, and private wardrobe curation at our Carmel-by-the-Sea flagship or private Pebble Beach clubhouse lounge.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-2xl border border-[#E4E0D6] p-8 sm:p-12 text-center shadow-lg animate-fadeIn space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#2E6B47]/10 mx-auto flex items-center justify-center text-[#2E6B47]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase font-semibold tracking-[0.15em] text-[#8A7A5C]">
                Request Registered
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1C1A] mt-1">
                Your Concierge Fitting is Staged
              </h2>
              <p className="text-xs sm:text-sm text-[#57564E] mt-2 max-w-md mx-auto leading-relaxed">
                Our Master Clothier at the Pebble Beach flagship has received your appointment parameters. You will receive a direct telephonic confirmation within 2 business hours.
              </p>
            </div>

            <div className="p-6 bg-[#FAF8F3] rounded-xl border border-[#E4E0D6] max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#8B897D]">Client:</span>
                <span className="font-semibold text-[#1C1C1A]">{form.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8B897D]">Club / Handicap:</span>
                <span className="font-semibold text-[#1C1C1A]">{form.homeClub} ({form.handicap} HCP)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8B897D]">Venue:</span>
                <span className="font-semibold text-[#1F3B2C]">Pebble Beach Clubhouse Lounge</span>
              </div>
            </div>

            <button
              onClick={() => setSubmitted(false)}
              className="btn-primary px-8 py-3 text-xs uppercase tracking-wider font-semibold"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E4E0D6] p-6 sm:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg text-[#1C1C1A]">Client Profile</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#57564E] block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#57564E] block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#57564E] block mb-1">Direct Phone</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#57564E] block mb-1">Home Club / Course</label>
                    <input
                      type="text"
                      value={form.homeClub}
                      onChange={(e) => setForm({ ...form, homeClub: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#57564E] block mb-1">Handicap Index</label>
                    <input
                      type="text"
                      value={form.handicap}
                      onChange={(e) => setForm({ ...form, handicap: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
                    />
                  </div>
                </div>
              </div>

              {/* Appointment Parameters */}
              <div className="space-y-4 pt-4 border-t border-[#E4E0D6]">
                <h3 className="font-serif text-lg text-[#1C1C1A]">Fitting Requirements</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-[#57564E] block mb-1">Inquiry Type</label>
                    <select
                      value={form.appointmentType}
                      onChange={(e) => setForm({ ...form, appointmentType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
                    >
                      <option value="bespoke_apparel">Full Tournament Wardrobe Allocation (4-Day)</option>
                      <option value="custom_glove_monogram">Custom Cabretta Glove Sizing &amp; Monogramming</option>
                      <option value="footwear_fitting">Vibram Spikeless Derby Shoe Custom Sizing</option>
                      <option value="corporate_club">Club / Team Tournament Capsule Order</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-[#57564E] block mb-1">Preferred Location</label>
                    <select
                      value={form.preferredLocation}
                      onChange={(e) => setForm({ ...form, preferredLocation: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
                    >
                      <option value="pebble_beach_clubhouse">Pebble Beach Clubhouse Private Lounge</option>
                      <option value="carmel_flagship">Carmel-by-the-Sea Flagship Studio</option>
                      <option value="private_residence">Private Residence / Locker Valet (Northern California)</option>
                      <option value="digital_concierge">Digital Video Consultation with Master Clothier</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#57564E] block mb-1">Tournament Notes or Fitting Specifics</label>
                  <textarea
                    rows={4}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F3] border border-[#E4E0D6] rounded-md text-xs focus:outline-none focus:border-[#1F3B2C]"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full btn-primary py-4 text-xs uppercase tracking-wider font-semibold shadow-md flex items-center justify-center gap-2"
              >
                <span>Transmit Concierge Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-[#8B897D]">
                <ShieldCheck className="w-4 h-4 text-[#2E6B47]" />
                <span>Strict confidentiality assured. Reserved exclusively for Elevated Green patrons.</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

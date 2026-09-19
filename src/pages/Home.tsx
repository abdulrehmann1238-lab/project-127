import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Sparkles, Wind, Sun, Compass, ShieldCheck } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { ProductCard } from '../components/product/ProductCard';

export const Home: React.FC = () => {
  const { products } = useInventory();
  const [inlineEmail, setInlineEmail] = useState('');
  const [inlineSubscribed, setInlineSubscribed] = useState(false);

  // Filter new arrivals
  const newArrivals = products.filter((p) => p.isNewArrival || p.isBestSeller).slice(0, 4);

  const categories = [
    {
      title: 'Course Apparel',
      tagline: 'Italian performance merino, stretch twills & UV polos',
      image: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&w=800&q=80',
      link: '/shop?category=Apparel'
    },
    {
      title: 'Vibram Footwear',
      tagline: 'Waterproof calfskin & spikeless multi-angle traction',
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
      link: '/shop?category=Footwear'
    },
    {
      title: 'Leather & Headcovers',
      tagline: 'Grade-AAA cabretta gloves & hand-burnished bridle leather',
      image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=800&q=80',
      link: '/shop?category=Accessories'
    }
  ];

  const instagramPosts = [
    {
      image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=600&q=80',
      product: 'Links Cabretta Leather Glove',
      price: '$48',
      slug: 'links-cabretta-leather-glove'
    },
    {
      image: 'https://images.unsplash.com/photo-1592860965319-3ff7e2fba3d5?auto=format&fit=crop&w=600&q=80',
      product: 'Linksman Headcover Set',
      price: '$88',
      slug: 'linksman-leather-hybrid-headcover'
    },
    {
      image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80',
      product: 'Fairway Quarter-Zip',
      price: '$188',
      slug: 'fairway-quarter-zip-pullover'
    },
    {
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
      product: 'Links Yardage Book Cover',
      price: '$68',
      slug: 'links-waxed-yardage-book-cover'
    },
    {
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80',
      product: 'Tour Performance Polo',
      price: '$118',
      slug: 'tour-performance-polo'
    },
    {
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
      product: 'Weekend Leather Duffel',
      price: '$248',
      slug: 'clubhouse-leather-weekend-duffel'
    }
  ];

  const handleInlineSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (inlineEmail) {
      setInlineSubscribed(true);
      setInlineEmail('');
    }
  };

  return (
    <div className="bg-[#FAF8F3]">
      
      {/* 1. HERO SECTION (§7) */}
      <section className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center justify-center overflow-hidden bg-[#14211A] text-white">
        {/* Background Video / Luxury Golf Imagery Fallback */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=2000&q=80"
            className="w-full h-full object-cover opacity-50 scale-105 transform translate-y-0"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-golf-player-swinging-the-club-on-the-grass-43899-large.mp4"
              type="video/mp4"
            />
          </video>
          {/* Subtle fairway-green gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14211A] via-[#1F3B2C]/40 to-[#14211A]/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 py-20 text-center flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FAF8F3] text-xs font-medium uppercase tracking-[0.15em] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#B8916A]" />
            <span>Autumn / Winter 2026 Collection</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-[#FAF8F3] max-w-4xl leading-[1.08]">
            Dressed for the Course. <br />
            <span className="italic font-normal text-[#FAF8F3]/90">Built for Life.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-[#FAF8F3]/80 max-w-2xl font-light leading-relaxed font-sans">
            Premium golf and lifestyle apparel, curated for those who take their game — and their quiet style — seriously.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-4 bg-[#FAF8F3] text-[#14211A] hover:bg-white text-xs uppercase font-bold tracking-[0.12em] rounded-md transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span>Shop New Arrivals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto px-8 py-4 btn-outline-white text-xs uppercase font-bold tracking-[0.12em] rounded-md transition-all flex items-center justify-center"
            >
              <span>Our Story</span>
            </Link>
          </div>

          {/* Live POS Sync Client Callout Badge */}
          <div className="mt-12 inline-flex items-center gap-2 px-3 py-1 bg-black/40 rounded-full border border-white/10 text-[11px] text-[#FAF8F3]/70">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2E6B47]" />
            <span>Square POS In-Store Sync Active • Stock accurate in real-time</span>
          </div>

          {/* Scroll Cue Indicator */}
          <div className="absolute bottom-6 inset-x-0 flex flex-col items-center justify-center pointer-events-none opacity-70 animate-float-slow">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#FAF8F3]/60 mb-1">Scroll</span>
            <ChevronDown className="w-4 h-4 text-[#FAF8F3]" />
          </div>
        </div>
      </section>

      {/* 2. COURSE CONDITIONS & MEMBER TELEMETRY (§1 Enhancement 3) */}
      <section className="bg-[#FAF8F3] border-b border-[#E4E0D6] py-5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-[#57564E]">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#1F3B2C] uppercase tracking-wider text-[11px]">
              Monterey Links Report:
            </span>
            <span className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5 text-[#B8916A]" /> 66°F Crisp &amp; Sunny</span>
            <span className="hidden sm:flex items-center gap-1.5"><Wind className="w-3.5 h-3.5 text-[#8A7A5C]" /> 9mph Coastal Breeze</span>
            <span className="hidden md:flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-[#8A7A5C]" /> Greens Stimp 11.5</span>
          </div>
          <div className="flex items-center gap-2 font-medium text-[#1F3B2C]">
            <Link to="/concierge" className="hover:underline flex items-center gap-1">
              <span>Book Concierge Clubhouse Fitting</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY (3-UP EDITORIAL CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase font-semibold tracking-[0.15em] text-[#8A7A5C] block mb-2">
              Curated Wardrobe
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1C1A]">
              Explore by Discipline
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs uppercase font-semibold tracking-[0.1em] text-[#1F3B2C] hover:text-[#16291F] flex items-center gap-1.5 mt-4 sm:mt-0 underline underline-offset-4"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={cat.link}
              className="group relative h-[420px] rounded-xl overflow-hidden bg-stone-100 shadow-sm border border-[#E4E0D6] flex flex-col justify-end p-8"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              
              <div className="relative z-10 text-white">
                <span className="text-[11px] uppercase tracking-[0.15em] text-[#D7CEBE] font-medium block mb-1">
                  Collection
                </span>
                <h3 className="font-serif text-2xl font-medium text-white mb-1.5 group-hover:translate-x-1 transition-transform">
                  {cat.title}
                </h3>
                <p className="text-xs text-white/80 line-clamp-2 max-w-xs font-light">
                  {cat.tagline}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#FAF8F3] uppercase tracking-wider group-hover:text-[#B8916A] transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. NEW ARRIVALS (SNAP PRODUCT RAIL WITH QUICK-ADD) */}
      <section className="bg-white py-20 lg:py-28 border-y border-[#E4E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase font-semibold tracking-[0.15em] text-[#8A7A5C] block mb-2">
                Fresh Off The Fairway
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1C1A]">
                Featured New Arrivals
              </h2>
            </div>
            <Link
              to="/shop?filter=new"
              className="text-xs uppercase font-semibold tracking-[0.1em] text-[#1F3B2C] flex items-center gap-1.5 underline underline-offset-4"
            >
              <span>See All New ({newArrivals.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. BRAND STORY STRIP (SPLIT EDITORIAL BANNER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[#FAF8F3] rounded-2xl p-6 sm:p-12 border border-[#E4E0D6]">
          {/* Pinned Image Left */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-[#E4E0D6]">
              <img
                src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80"
                alt="Crafting golf leather gloves"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Subtle decorative badge */}
            <div className="absolute -bottom-4 -right-4 bg-[#1F3B2C] text-[#FAF8F3] p-4 rounded-lg shadow-md border border-[#14211A] hidden sm:block">
              <span className="font-serif text-lg font-medium block">Pebble &amp; Pine</span>
              <span className="text-[10px] text-[#8A7A5C] uppercase tracking-widest font-mono">EST. 2026</span>
            </div>
          </div>

          {/* Editorial Copy Right */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-semibold tracking-[0.15em] text-[#8A7A5C] block">
              The Architecture of Comfort
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1C1A] leading-tight">
              Quiet Mastery. <br />
              Uncompromising Craft.
            </h2>
            <p className="text-sm sm:text-base text-[#57564E] leading-relaxed">
              We reject the garish neon logos and disposable synthetic polyesters that dominate the modern fairway. The Elevated Green was founded in Pebble Beach on a solitary conviction: golf attire should embody the quiet confidence of the course itself.
            </p>
            <p className="text-sm text-[#57564E] leading-relaxed">
              Every seam is tension-tested through 10,000 swings. Every leather skin is hand-selected in Florence and Addis Ababa. Every garment effortlessly transitions from the 18th pin to the evening terrace.
            </p>
            <div className="pt-2 flex items-center gap-6">
              <Link
                to="/about"
                className="btn-primary px-6 py-3 text-xs uppercase tracking-wider font-semibold"
              >
                Read Our Story
              </Link>
              <Link
                to="/concierge"
                className="text-xs uppercase font-semibold tracking-wider text-[#8A7A5C] hover:text-[#1F3B2C] underline underline-offset-4"
              >
                White-Glove Fitting
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INSTAGRAM SHOPPABLE GRID (6 TILES) */}
      <section className="bg-white py-20 border-t border-[#E4E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase font-semibold tracking-[0.15em] text-[#8A7A5C] block mb-2">
              The Clubhouse Feed
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1C1A]">
              Follow @theelevatedgreen
            </h2>
            <p className="text-xs text-[#8B897D] mt-2">
              Hover over any square to view and shop the course-tested apparel directly.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {instagramPosts.map((post, idx) => (
              <Link
                key={idx}
                to={`/product/${post.slug}`}
                className="group relative aspect-square rounded-lg overflow-hidden bg-stone-100 border border-[#E4E0D6] block"
              >
                <img
                  src={post.image}
                  alt={post.product}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Shoppable Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-[#B8916A] font-semibold">
                    Shop Look
                  </span>
                  <h4 className="text-xs font-semibold leading-tight line-clamp-1">
                    {post.product}
                  </h4>
                  <span className="text-xs text-white/80 font-mono font-medium mt-0.5">
                    {post.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NEWSLETTER BAND (§7 & §13) */}
      <section className="bg-[#14211A] text-[#FAF8F3] py-20 px-4 sm:px-6 border-t border-[#FAF8F3]/10">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase font-semibold tracking-[0.2em] text-[#B8916A]">
            The Elevated Green Journal
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F3]">
            Access Private Seasonal Allocations
          </h2>
          <p className="text-xs sm:text-sm text-[#8B897D] leading-relaxed max-w-lg mx-auto">
            Subscribers receive first notification of small-batch merino drops, tournament capsules, and invitations to private fitting events.
          </p>

          {inlineSubscribed ? (
            <div className="p-4 bg-[#1F3B2C] border border-[#2E6B47] rounded-lg max-w-md mx-auto text-xs text-[#FAF8F3] flex items-center justify-center gap-2 animate-fadeIn">
              <Sparkles className="w-4 h-4 text-[#B8916A]" />
              <span>You're on the list — welcome to The Elevated Green.</span>
            </div>
          ) : (
            <form onSubmit={handleInlineSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={inlineEmail}
                onChange={(e) => setInlineEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-white/20 rounded-md px-4 py-3 text-xs text-white placeholder-[#8B897D] focus:outline-none focus:border-[#B8916A]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#FAF8F3] text-[#14211A] hover:bg-white text-xs uppercase font-bold tracking-wider rounded-md transition-colors"
              >
                Join Journal
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};

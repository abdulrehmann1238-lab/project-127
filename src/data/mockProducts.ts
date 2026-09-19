import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'fairway-quarter-zip-pullover',
    name: 'Fairway Quarter-Zip Pullover',
    subtitle: 'Italian Performance Merino Blend',
    category: 'Apparel',
    price: 188,
    sku: 'EG-QZ-MOS-01',
    description: 'Engineered for breezy morning tee times and clubhouse evenings. Tailored from a bespoke Italian merino wool and recycled moisture-wicking technical yarn blend that moves effortlessly through your swing.',
    details: [
      'Four-way mechanical stretch fabric',
      'Articulated raglan sleeves for unrestricted shoulder rotation',
      'Concealed YKK antique brass quarter-zip with leather pull',
      'Ribbed hem and cuffs engineered to retain shape'
    ],
    materials: '65% Extra-Fine Merino Wool, 35% Technical Moisture-Wicking Poly',
    care: 'Dry clean recommended or hand wash cold inside out, lay flat to dry',
    fit: 'Modern athletic tailored cut. If between sizes or layering over a thick polo, consider sizing up.',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Moss Green', hex: '#243C2E' },
      { name: 'Oatmeal Heather', hex: '#D7CEBE' },
      { name: 'Midnight Navy', hex: '#1C2735' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 14,
    posStock: 14,
    isNewArrival: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 38
  },
  {
    id: 'prod-2',
    slug: 'tour-performance-polo',
    name: 'Tour Performance Polo',
    subtitle: 'Breathable Piqué Micro-Knit',
    category: 'Apparel',
    price: 118,
    sku: 'EG-PL-SND-02',
    description: 'The pinnacle of golf polo craftsmanship. Features an antimicrobial micro-piqué knit with UPF 50+ solar defense and our signature reinforced structured collar that stays crisp throughout 18 holes.',
    details: [
      'UPF 50+ sun protection built into the yarn fibers',
      'Self-fabric structured collar with removable stays',
      'Natural mother-of-pearl buttons with reinforced cross-stitching',
      'Side split hem with herringbone tape reinforcement'
    ],
    materials: '88% High-Gauge Micro-Polyester, 12% Spandex',
    care: 'Machine wash cold with like colors. Tumble dry low.',
    fit: 'Tailored fit through the chest and torso with clean sleeve drape.',
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1625910513413-562a0ee68e98?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Sand Khaki', hex: '#C2B69D' },
      { name: 'Alabaster White', hex: '#F4F2EB' },
      { name: 'Forest Green', hex: '#1B3526' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 22,
    posStock: 22,
    isNewArrival: false,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 64
  },
  {
    id: 'prod-3',
    slug: 'links-cabretta-leather-glove',
    name: 'Links Cabretta Leather Glove',
    subtitle: 'Grade-AAA Ethiopian Cabretta',
    category: 'Accessories',
    price: 48,
    sku: 'EG-GL-TAN-03',
    description: 'Precision-tanned Ethiopian cabretta leather provides second-skin tactile feel and unmatched grip in wet or dry course conditions. Perforated fingers maximize airflow on humid summer afternoons.',
    details: [
      '0.45mm ultra-thin tour-grade Ethiopian cabretta leather',
      'Precision laser-cut perforations across palm and knuckle vents',
      'Angled velcro closure with embossed brass metal club crest',
      'Moisture-absorbent terry cotton wrist cuff'
    ],
    materials: '100% Genuine Cabretta Leather',
    care: 'Air dry away from direct sunlight. Do not saturate.',
    fit: 'Snug second-skin fit. Leather naturally molds to hand contours after one round.',
    images: [
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Heritage Tan', hex: '#9C6F44' },
      { name: 'Chalk White', hex: '#F0EEE9' },
      { name: 'Black Onyx', hex: '#1A1A1A' }
    ],
    sizes: ['Cadet M', 'Cadet ML', 'Cadet L', 'Regular M', 'Regular L', 'Regular XL'],
    stock: 3, // Low stock alert demonstration!
    posStock: 3,
    isNewArrival: false,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 92
  },
  {
    id: 'prod-4',
    slug: 'tour-stretch-tailored-trousers',
    name: 'Tour Stretch Tailored Trousers',
    subtitle: 'Technical Stretch Twill Chino',
    category: 'Apparel',
    price: 198,
    sku: 'EG-TR-CHR-04',
    description: 'The standard for refined on-course elegance. Constructed with Japanese four-way stretch twill that repels early morning dew while delivering a clean dress-pant drape suitable for the clubhouse dining room.',
    details: [
      'DWR water-repellent finish repels moisture, dew, and light drizzle',
      'Interior shirt-gripper waistband keeps polo tucked during swings',
      'Deep ball-marker pocket with concealed tee sleeve',
      'Tailored tapered leg opening with subtle ankle cuff notch'
    ],
    materials: '72% Recycled Nylon, 20% Polyester, 8% Elastane',
    care: 'Machine wash warm, hang dry. Cool iron if needed.',
    fit: 'Tailored slim-straight cut with comfort stretch waistband.',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Charcoal Slate', hex: '#3E4144' },
      { name: 'Stone Sand', hex: '#D1C7B7' },
      { name: 'Fairway Navy', hex: '#1B2738' }
    ],
    sizes: ['30x30', '32x30', '32x32', '34x32', '36x32'],
    stock: 8,
    posStock: 8,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.7,
    reviewCount: 29
  },
  {
    id: 'prod-5',
    slug: 'caddie-structure-crest-cap',
    name: 'Caddie Structured Crest Cap',
    subtitle: 'Waxed Cotton & Brass Clasp',
    category: 'Accessories',
    price: 54,
    sku: 'EG-CP-CRM-05',
    description: 'A classic 6-panel unstructured silhouette cut from water-resistant waxed cotton canvas. Finished with an embroidered tonal Elevated Green crest and an antique brass tri-glide buckle.',
    details: [
      'Heavyweight 8oz waxed cotton twill',
      'Antimicrobial moisture-wicking interior sweatband',
      'Curved memory brim with green undervisor to reduce glare',
      'Embossed brass tri-glide adjuster with tuck-away strap'
    ],
    materials: '100% Waxed Cotton Canvas',
    care: 'Spot clean with damp cloth and cold water',
    fit: 'Adjustable one-size strap fits head sizes 56cm to 62cm.',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Cream Sand', hex: '#EDE8DF' },
      { name: 'Deep Evergreen', hex: '#1A3324' },
      { name: 'Dark Roast', hex: '#3B2F2F' }
    ],
    sizes: ['One Size Fits All'],
    stock: 19,
    posStock: 19,
    isNewArrival: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 71
  },
  {
    id: 'prod-6',
    slug: 'augusta-merino-knit-vest',
    name: 'Augusta Merino Knit Vest',
    subtitle: 'Thermal Fine-Gauge Knitwear',
    category: 'Apparel',
    price: 165,
    sku: 'EG-VT-FOR-06',
    description: 'Designed as the quintessential mid-layer for brisk coastal links rounds. Pure Australian merino wool naturally moderates core body heat without adding swing-restricting bulk across the shoulders.',
    details: [
      '100% Extra-fine 19.5 micron Australian Merino Wool',
      'Seamless tubular knit body prevents chafing under outer shell',
      'Ribbed V-neck opening tailored to cleanly frame polo collars',
      'Naturally odor-resistant and temperature-regulating'
    ],
    materials: '100% Merino Wool',
    care: 'Hand wash cold or dry clean. Reshape while wet.',
    fit: 'Classic tailored fit through torso with generous armhole allowance.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Forest Green', hex: '#1C3829' },
      { name: 'Heather Camel', hex: '#BA9B76' },
      { name: 'Oxford Slate', hex: '#4A5057' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 2, // Low stock demonstration!
    posStock: 2,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 19
  },
  {
    id: 'prod-7',
    slug: 'clubhouse-leather-weekend-duffel',
    name: 'Clubhouse Leather Weekend Duffel',
    subtitle: 'Full-Grain Italian Leather & Brass',
    category: 'Accessories',
    price: 248,
    sku: 'EG-DF-SDL-07',
    description: 'Handcrafted for destination golf weekends at Bandon or Kohler. Built from vegetable-tanned full-grain leather with dedicated ventilated shoe compartment for your spiked footwear.',
    details: [
      'Vegetable-tanned full-grain steerhide that develops rich patina',
      'Exterior side-loading water-resistant golf shoe compartment',
      'Reinforced riveted rolled leather carrying handles',
      'Detachable padded canvas shoulder strap with brass clips'
    ],
    materials: '100% Full-Grain Vegetable Tanned Leather, Heavy Canvas Lining',
    care: 'Condition leather biannually with specialized balm.',
    fit: 'Meets standard airline carry-on dimensions (48L capacity).',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Saddle Tan', hex: '#8F5426' },
      { name: 'Espresso', hex: '#31221B' },
      { name: 'British Racing Green', hex: '#11291B' }
    ],
    sizes: ['48L Weekend'],
    stock: 5,
    posStock: 5,
    isNewArrival: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 43
  },
  {
    id: 'prod-8',
    slug: 'monterey-spikeless-derby-shoe',
    name: 'Monterey Spikeless Derby Shoe',
    subtitle: 'Waterproof Calfskin & Vibram Outsole',
    category: 'Footwear',
    price: 235,
    sku: 'EG-SH-WHT-08',
    description: 'A seamless bridge from the fairway to the terrace bar. Combines timeless wingtip derby styling with a waterproof membrane, OrthoLite eco-cushion footbed, and custom multi-directional Vibram turf studs.',
    details: [
      'Top-grain waterproof calfskin leather with 2-year guarantee',
      'Custom multi-angle Vibram spikeless rubber turf grip outsole',
      'High-rebound EVA midsole absorbs 18 holes of walking fatigue',
      'Waxed cotton dress laces with brass aglets'
    ],
    materials: 'Calfskin Leather Upper, Vibram Rubber Outsole, EVA Midsole',
    care: 'Wipe clean with moist sponge. Polish with neutral cream.',
    fit: 'True to size. Medium D-width with generous toe box room.',
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Pure White & Cognac', hex: '#F7F6F2' },
      { name: 'Nutmeg Brown', hex: '#7D5135' },
      { name: 'Tuxedo Black', hex: '#1E1E1E' }
    ],
    sizes: ['8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    stock: 11,
    posStock: 11,
    isNewArrival: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 52
  },
  {
    id: 'prod-8b',
    slug: 'st-andrews-waterproof-wingtip-oxford',
    name: 'St. Andrews Waterproof Wingtip Oxford',
    subtitle: 'Hand-Finished Italian Steerhide & Spikeless Outsole',
    category: 'Footwear',
    price: 275,
    sku: 'EG-SH-OXF-8B',
    description: 'Bespoke European craftsmanship built for 36-hole tournament days. Fully seam-sealed waterproof calfskin with brogue perforations, high-traction TPU turf cleats, and supple lambskin lining.',
    details: [
      'Top-grain hand-burnished Italian steerhide leather',
      'Spikeless dual-density polyurethane fairway traction system',
      'Waterproof membrane guaranteed through 100 coastal rounds',
      'Removable cork and memory foam antimicrobial footbed'
    ],
    materials: 'Italian Calfskin Leather, Dual-Density TPU Outsole',
    care: 'Clean with soft cloth and condition with natural wax polish.',
    fit: 'Classic dress shoe fit. Medium width with structured heel counter.',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Heritage Chestnut', hex: '#633B23' },
      { name: 'Onyx Black', hex: '#1C1C1A' }
    ],
    sizes: ['8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    stock: 9,
    posStock: 9,
    isNewArrival: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 34
  },
  {
    id: 'prod-8c',
    slug: 'pebble-spikeless-tour-sneaker',
    name: 'Pebble Spikeless Tour Sneaker',
    subtitle: 'Breathable Technical Knit & OrthoLite Turf Sole',
    category: 'Footwear',
    price: 195,
    sku: 'EG-SH-SNK-8C',
    description: 'Modern athletic elegance for walking golfers. Features an engineered water-resistant stretch knit upper, responsive energy-return foam midsole, and perimeter turf grip lugs.',
    details: [
      'Engineered water-repellent performance knit with TPU mudguard',
      'OrthoLite Impressions eco-cushioning for all-day walking comfort',
      'Perimeter-weighted spikeless rubber studs for swing torque stability',
      'Grip-lock tongue prevents sliding during foot rotation'
    ],
    materials: 'Technical Poly-Knit, High-Rebound EVA, Rubber Cleats',
    care: 'Spot clean with mild soapy water and soft brush.',
    fit: 'Athletic sneaker fit with natural toe splay.',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'
    ],
    colors: [
      { name: 'Fairway Chalk & Moss', hex: '#EDE8DF' },
      { name: 'Navy & Saddle', hex: '#1A2536' }
    ],
    sizes: ['8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    stock: 14,
    posStock: 14,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 27
  },
  {
    id: 'prod-9',
    slug: 'links-waxed-yardage-book-cover',
    name: 'Links Yardage Book & Scorecard Cover',
    subtitle: 'English Bridle Leather with Brass Pencil',
    category: 'Accessories',
    price: 68,
    sku: 'EG-YB-BRN-09',
    description: 'Hand-burnished English bridle leather cover tailored to fit PGA tour yardage books and club scorecards. Features interior elastic strap hold and integrated solid brass magnetic ball marker.',
    details: [
      'Vegetable-tanned 5oz English bridle leather',
      'Includes refillable solid brass golf pencil',
      'Magnetic brass ball marker recessed into back cover',
      'Debossed course coordinates detailing'
    ],
    materials: '100% English Bridle Leather, Solid Brass Hardware',
    care: 'Spot clean only',
    fit: 'Fits standard 4.25" x 7.25" yardage and scorecard books.',
    images: [
      'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Vintage Chestnut', hex: '#633B23' },
      { name: 'Olive Drab', hex: '#485038' }
    ],
    sizes: ['Standard Tour Size'],
    stock: 16,
    posStock: 16,
    isNewArrival: false,
    isBestSeller: false,
    rating: 4.9,
    reviewCount: 18
  },
  {
    id: 'prod-10',
    slug: 'fairway-waterproof-windshirt',
    name: 'Fairway Waterproof Windshirt',
    subtitle: '3-Layer Lightweight Storm Shell',
    category: 'Apparel',
    price: 215,
    sku: 'EG-WS-SLT-10',
    description: 'A noiseless, ultra-lightweight storm jacket that stows inside its own chest pocket. Fully taped seams with 20k waterproof / 20k breathability rating to withstand downpours on Scottish links.',
    details: [
      '3-layer Japanese mechanical stretch membrane (20k/20k)',
      '100% taped waterproof seams and Aquaguard matte zips',
      'Silent knit outer face eliminates swing rustle',
      'Adjustable cinch waist and asymmetrical storm cuffs'
    ],
    materials: '100% Recycled Hydrophilic Nylon Membrane',
    care: 'Machine wash delicate cold. Line dry.',
    fit: 'Athletic outerwear fit designed to slip cleanly over a sweater.',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Deep Sea Slate', hex: '#2A3C47' },
      { name: 'Fairway Moss', hex: '#2D4434' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 7,
    posStock: 7,
    isNewArrival: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 22
  },
  {
    id: 'prod-11',
    slug: 'linksman-leather-hybrid-headcover',
    name: 'Linksman Hybrid & Wood Headcover Set',
    subtitle: 'Full-Grain Leather with Fleece Lining',
    category: 'Accessories',
    price: 88,
    sku: 'EG-HC-SET-11',
    description: 'Protect your finest metals with tailored full-grain leather covers. Lined with plush shearling-style microfiber fleece to prevent clubhead scratches and chatter during cart rides or carry rounds.',
    details: [
      'Top-grain waterproof cowhide leather with piped seams',
      'Ultra-dense 400gsm synthetic shearling interior',
      'Internal elastic retention band prevents slipping off',
      'Direct embroidery vintage club numerals'
    ],
    materials: 'Full-grain cowhide leather, faux shearling fleece',
    care: 'Wipe clean with leather cleaner',
    fit: 'Accommodates standard 460cc Drivers, 3-Woods, and Hybrids.',
    images: [
      'https://images.unsplash.com/photo-1592860965319-3ff7e2fba3d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Heritage Tan & Cream', hex: '#A37248' },
      { name: 'Hunter Green & Gold', hex: '#153222' }
    ],
    sizes: ['Driver (460cc)', '3-Wood', 'Hybrid'],
    stock: 12,
    posStock: 12,
    isNewArrival: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 31
  },
  {
    id: 'prod-12',
    slug: 'the-elevated-green-digital-gift-card',
    name: 'The Elevated Green Gift Card',
    subtitle: 'Curated Luxury for the Discerning Golfer',
    category: 'Gift Cards',
    price: 150,
    sku: 'EG-GC-DIG-12',
    description: 'Give the gift of bespoke fairways, tailored apparel, and handcrafted accessories. Delivered instantly via email with personalized clubhouse notes and digital Apple Wallet integration.',
    details: [
      'Instant digital delivery via email or printable gift card',
      'Redeemable online and in-store via Square POS',
      'No expiration date or maintenance fees',
      'Complimentary luxury physical card upon request for orders over $250'
    ],
    materials: 'Digital Redemption Code & Apple Wallet Pass',
    care: 'Keep digital code secure until redemption',
    fit: 'Available in values from $50 to $1,000.',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1000&q=80'
    ],
    colors: [
      { name: 'Clubhouse Green & Brass', hex: '#1F3B2C' },
      { name: 'Chalk White & Black', hex: '#FAF8F3' }
    ],
    sizes: ['$50', '$100', '$150', '$250', '$500'],
    stock: 999,
    posStock: 999,
    isNewArrival: false,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 88
  }
];

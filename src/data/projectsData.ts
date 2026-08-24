import { Project, Inquiry } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'grand-residence',
    name: 'Starpath Grand Residence',
    tagline: 'Ultra-Luxury Living in Banani DOHS',
    area: 'Banani',
    address: 'Road 11, Banani DOHS, Dhaka',
    block: 'Banani DOHS',
    price: '৳2.50 Crore',
    priceRaw: 250,
    size: '3,600 sq. ft.',
    sizeSqft: 3600,
    bedrooms: 4,
    bathrooms: 5,
    parking: 3,
    totalUnits: 20,
    availableUnits: 7, // Demo target: 7 -> 6
    soldUnits: 13,
    status: 'Ready to Move',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Starpath Grand Residence is a masterwork in prestigious Banani DOHS. Offering ultra-spacious luxury suites with private elevator foyer, floor-to-ceiling panoramic glass, imported Spanish marble flooring, dual master suites with jacuzzi, and 3 covered car parking spaces.',
    keyFeatures: [
      '3,600 sq. ft. expansive single-unit floor layout',
      '4 grand master bedrooms with ensuite designer baths',
      'Private dedicated lift foyer & biometric entry',
      '3 spacious covered car parking bays per apartment',
      'Floor-to-ceiling acoustic double-glazed German windows'
    ],
    amenities: [
      'Parking',
      'Lift',
      'Generator',
      'Security',
      'Community Space',
      'Rooftop Garden',
      'Gymnasium',
      'EV Charging Point'
    ],
    coordinates: [23.7937, 90.4043],
    phone: '09610969620',
    completionYear: '2025',
    handoverDate: 'Ready for Immediate Handover'
  },
  {
    id: 'peace-harbor',
    name: 'Peace Harbor',
    tagline: 'Urban Living with Elegance',
    area: 'Bashundhara',
    address: 'Block - D, Bashundhara R/A, Dhaka',
    block: 'Block D',
    price: '৳2.20 Crore',
    priceRaw: 220,
    size: '2,400 sq. ft.',
    sizeSqft: 2400,
    bedrooms: 4,
    bathrooms: 4,
    parking: 2,
    totalUnits: 16,
    availableUnits: 5,
    soldUnits: 11,
    status: 'Under Construction',
    isFeatured: true,
    image: '/assets/peace-harbor.jpg',
    galleryImages: [
      '/assets/peace-harbor.jpg',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Tired of the city\'s noise and chaos? Find your peace at Peace Harbor, Bashundhara R/A! 2,400 sq. ft. spacious layout, 4 elegant bedrooms, wide & comfortable design, and premium modern finishing crafted for timeless luxury.',
    keyFeatures: [
      '2,400 sq. ft. spacious layout',
      '4 elegant bedrooms with cross ventilation',
      'Wide & comfortable living and dining design',
      'Premium modern finishing & branded fittings',
      'Located in serene Block-D, Bashundhara R/A'
    ],
    amenities: [
      'Parking',
      'Lift',
      'Generator',
      'Security',
      'Community Space',
      'Rooftop BBQ Lounge',
      'Kids Play Zone'
    ],
    coordinates: [23.8166, 90.4358],
    phone: '09610969620',
    completionYear: '2026',
    handoverDate: 'December 2026'
  },
  {
    id: 'anukabbo',
    name: 'Starpath Anukabbo',
    tagline: 'Experience Elegance at Aftabnagar',
    area: 'Aftabnagar',
    address: 'Block B, Aftabnagar, Dhaka',
    block: 'Block B',
    price: '৳1.45 Crore',
    priceRaw: 145,
    size: '1,740 sq. ft.',
    sizeSqft: 1740,
    bedrooms: 3,
    bathrooms: 3,
    parking: 1,
    totalUnits: 14,
    availableUnits: 4,
    soldUnits: 10,
    status: 'Under Construction',
    isFeatured: true,
    image: '/assets/anukabbo.jpg',
    galleryImages: [
      '/assets/anukabbo.jpg',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Experience Elegance at Aftabnagar. Step into your dream home at Aftabnagar – Block B that elevates your lifestyle with comfort and style. Spacious 1,740 sq. ft. apartment with 3 cozy & well-designed bedrooms and lush landscaped rooftop.',
    keyFeatures: [
      'Spacious 1,740 sq. ft. apartment',
      '3 cozy & well-designed bedrooms',
      'South-facing corner plot with open airflow',
      'Modern modular kitchen layout',
      'Block B prime accessible location'
    ],
    amenities: [
      'Parking',
      'Lift',
      'Generator',
      'Security',
      'Community Space',
      'Rooftop Green Terrace'
    ],
    coordinates: [23.7668, 90.4305],
    phone: '09610969620',
    completionYear: '2026',
    handoverDate: 'June 2026'
  },
  {
    id: 'heights',
    name: 'Starpath Heights',
    tagline: 'The Pinnacle of Gulshan Elegance',
    area: 'Gulshan',
    address: 'Road 84, Gulshan-2, Dhaka',
    block: 'Gulshan 2',
    price: '৳4.20 Crore',
    priceRaw: 420,
    size: '3,200 sq. ft.',
    sizeSqft: 3200,
    bedrooms: 4,
    bathrooms: 4,
    parking: 2,
    totalUnits: 18,
    availableUnits: 3,
    soldUnits: 15,
    status: 'Almost Sold Out',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Iconic high-rise tower located in diplomatic zone of Gulshan-2. Engineered to international safety standards with panoramic skyline views, infinity rooftop deck, and 24/7 smart building concierge.',
    keyFeatures: [
      '3,200 sq. ft. luxury condominiums',
      'Direct diplomatic enclave access',
      'Panoramic glass facades',
      'Smart security & card access'
    ],
    amenities: [
      'Parking',
      'Lift',
      'Generator',
      'Security',
      'Community Space',
      'Rooftop Infinity Deck',
      'Fitness Club'
    ],
    coordinates: [23.7925, 90.4172],
    phone: '09610969620',
    completionYear: '2025',
    handoverDate: 'Ready for Handover'
  },
  {
    id: 'lake-view',
    name: 'Starpath Lake View',
    tagline: 'Serene Waterfront Residences',
    area: 'Gulshan',
    address: 'South Avenue, Gulshan-1 Lakeview, Dhaka',
    block: 'Gulshan 1',
    price: '৳3.20 Crore',
    priceRaw: 320,
    size: '2,850 sq. ft.',
    sizeSqft: 2850,
    bedrooms: 3,
    bathrooms: 4,
    parking: 2,
    totalUnits: 12,
    availableUnits: 2,
    soldUnits: 10,
    status: 'Almost Sold Out',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Unobstructed waterfront panorama over Gulshan Lake. Thoughtfully planned for quiet reflection while being minutes from prime diplomatic hubs and international schools.',
    keyFeatures: [
      'Direct front view of Gulshan Lake',
      '3 large balconies with glass balustrades',
      'Imported fittings & centralized gas pipeline'
    ],
    amenities: [
      'Parking',
      'Lift',
      'Generator',
      'Security',
      'Community Space',
      'Lakefront Walking Deck'
    ],
    coordinates: [23.7785, 90.4180],
    phone: '09610969620',
    completionYear: '2025',
    handoverDate: 'November 2025'
  },
  {
    id: 'gardenia',
    name: 'Starpath Gardenia',
    tagline: 'Lush Botanical Living in Bashundhara',
    area: 'Bashundhara',
    address: 'Block I, Bashundhara R/A, Dhaka',
    block: 'Block I',
    price: '৳1.85 Crore',
    priceRaw: 185,
    size: '2,100 sq. ft.',
    sizeSqft: 2100,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    totalUnits: 16,
    availableUnits: 8,
    soldUnits: 8,
    status: 'Under Construction',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A harmonious blend of lush green landscaping and contemporary architectural grace in Bashundhara Block I, minutes away from top international schools and hospitals.',
    keyFeatures: [
      'Landscaped ground and terrace gardens',
      'Double car parking allotment',
      '24/7 CCTV surveillance & dedicated guard post'
    ],
    amenities: [
      'Parking',
      'Lift',
      'Generator',
      'Security',
      'Community Space',
      'Jogging Path'
    ],
    coordinates: [23.8220, 90.4280],
    phone: '09610969620',
    completionYear: '2026',
    handoverDate: 'August 2026'
  },
  {
    id: 'urban-residence',
    name: 'Starpath Urban Residence',
    tagline: 'Modern Haven in the Heart of Uttara',
    area: 'Uttara',
    address: 'Sector 4, Road 7, Uttara, Dhaka',
    block: 'Sector 4',
    price: '৳1.65 Crore',
    priceRaw: 165,
    size: '1,950 sq. ft.',
    sizeSqft: 1950,
    bedrooms: 3,
    bathrooms: 3,
    parking: 1,
    totalUnits: 22,
    availableUnits: 6,
    soldUnits: 16,
    status: 'Ready to Move',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Strategically located in Uttara Sector 4 with rapid access to Dhaka Airport and Expressway. Features energy-efficient ventilation, imported tiles, and high-speed passenger lifts.',
    keyFeatures: [
      'Immediate airport expressway connection',
      '100% power backup with silent generator',
      'Community lounge and rooftop prayer hall'
    ],
    amenities: [
      'Parking',
      'Lift',
      'Generator',
      'Security',
      'Community Space',
      'Prayer Room'
    ],
    coordinates: [23.8685, 90.3980],
    phone: '09610969620',
    completionYear: '2024',
    handoverDate: 'Ready for Immediate Handover'
  },
  {
    id: 'signature-dhanmondi',
    name: 'Starpath Signature',
    tagline: 'Timeless Prestige in Classical Dhanmondi',
    area: 'Dhanmondi',
    address: 'Road 9/A, Dhanmondi, Dhaka',
    block: 'Road 9/A',
    price: '৳3.10 Crore',
    priceRaw: 310,
    size: '3,100 sq. ft.',
    sizeSqft: 3100,
    bedrooms: 4,
    bathrooms: 4,
    parking: 2,
    totalUnits: 15,
    availableUnits: 3,
    soldUnits: 12,
    status: 'Under Construction',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An architectural statement on Dhanmondi 9/A. Designed for distinguished families seeking space, calm, and heritage neighborhood charm close to Dhanmondi Lake.',
    keyFeatures: [
      'Single unit per floor for maximum privacy',
      'Huge master suite with walk-in wardrobe',
      'Modern seismic-resistant construction'
    ],
    amenities: [
      'Parking',
      'Lift',
      'Generator',
      'Security',
      'Community Space',
      'Rooftop Terrace'
    ],
    coordinates: [23.7461, 90.3742],
    phone: '09610969620',
    completionYear: '2026',
    handoverDate: 'October 2026'
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-101',
    projectId: 'grand-residence',
    projectName: 'Starpath Grand Residence',
    projectArea: 'Banani',
    fullName: 'Mahmudur Rahman',
    phone: '01711223344',
    email: 'mahmud.rahman@example.com',
    message: 'Interested in 4 Bed unit on 5th floor. Looking for site visit this weekend.',
    preferredDate: 'Saturday, 11:00 AM',
    timestamp: '10 mins ago',
    status: 'New'
  },
  {
    id: 'inq-102',
    projectId: 'peace-harbor',
    projectName: 'Peace Harbor',
    projectArea: 'Bashundhara',
    fullName: 'Dr. Nusrat Jahan',
    phone: '01819556677',
    email: 'nusrat.jahan@healthbd.org',
    message: 'Please send pricing breakdown and payment installment schedule for 2,400 sqft apartment.',
    preferredDate: 'Friday, 4:00 PM',
    timestamp: '2 hours ago',
    status: 'New'
  },
  {
    id: 'inq-103',
    projectId: 'anukabbo',
    projectName: 'Starpath Anukabbo',
    projectArea: 'Aftabnagar',
    fullName: 'Tanvir Hossain',
    phone: '01912998877',
    email: 'tanvir.h@techbd.com',
    message: 'Would like to inquire about loan processing support and handover timeline.',
    preferredDate: 'Tomorrow, 3:30 PM',
    timestamp: '5 hours ago',
    status: 'Contacted'
  }
];

export const AREAS = [
  { name: 'All', count: 8, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80' },
  { name: 'Gulshan', count: 2, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80' },
  { name: 'Banani', count: 1, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80' },
  { name: 'Bashundhara', count: 2, image: '/assets/peace-harbor.jpg' },
  { name: 'Aftabnagar', count: 1, image: '/assets/anukabbo.jpg' },
  { name: 'Uttara', count: 1, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80' },
  { name: 'Dhanmondi', count: 1, image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=400&q=80' },
];

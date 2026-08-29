import { Project, Inquiry } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'barakah',
    name: 'Starpath Barakah',
    tagline: 'Signature Luxury Single-Unit Residence',
    area: 'Banani',
    address: 'Banani DOHS, Dhaka',
    block: 'Banani DOHS',
    price: '৳3.40 Crore',
    priceRaw: 340,
    size: '3,600 sq. ft.',
    sizeSqft: 3600,
    bedrooms: 4,
    bathrooms: 5,
    parking: 14,
    totalUnits: 7,
    availableUnits: 7, // Demo target
    soldUnits: 0,
    status: 'Upcoming',
    isFeatured: true,
    image: '/assets/barakah-main.jpg',
    galleryImages: [
      '/assets/barakah-main.jpg',
      '/assets/barakah-lobby.jpg',
      '/assets/barakah-parking.jpg',
      '/assets/barakah-rooftop.jpg'
    ],
    description: 'Starpath Barakah is a signature residential masterpiece in prestigious Banani DOHS. Featuring ultra-luxurious single-unit per floor living with expansive 3,600 sq. ft. floor plans, 4 grand bedrooms with 5 attached baths, 4 wide cross-ventilated verandahs, West-facing natural daylight, 14 covered car parking bays, and a landscaped rooftop retreat.',
    keyFeatures: [
      '3,600 sq. ft. expansive single-unit per floor apartment',
      '4 grand bedrooms with 5 ensuite designer bathrooms',
      '4 wide cross-ventilated verandahs with open city views',
      'West-facing orientation for abundant natural light & airflow',
      'B+G+7 building structure with 14 covered parking bays & elevator',
      'Private lift foyer & designer marble entrance lounge'
    ],
    amenities: [
      'Parking (14 Bays)',
      'High-Speed Elevator',
      '100% Generator Backup',
      '24/7 CCTV & Security',
      'Grand Reception Lobby',
      'Landscaped Rooftop Deck',
      'BBQ & Community Terrace'
    ],
    coordinates: [23.7937, 90.4043],
    phone: '09610969620',
    completionYear: '2026',
    handoverDate: 'Upcoming Exclusive Project'
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
    status: 'Ongoing',
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
    status: 'Ongoing',
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
    id: 'shurommo',
    name: 'Starpath Shurommo',
    tagline: 'Modern Architectural Grandeur',
    area: 'Gulshan',
    address: 'Gulshan, Dhaka',
    block: 'Gulshan 2',
    price: '৳2.85 Crore',
    priceRaw: 285,
    size: '2,350 sq. ft.',
    sizeSqft: 2350,
    bedrooms: 3,
    bathrooms: 4,
    parking: 2,
    totalUnits: 12,
    availableUnits: 3,
    soldUnits: 9,
    status: 'Ongoing',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Starpath Shurommo is crafted for those who value contemporary elegance in prime Gulshan. Thoughtfully planned interiors, superior ventilation, and premier urban connectivity.',
    keyFeatures: [
      '2,350 sq. ft. modern luxury apartment',
      '3 large master bedrooms with attached baths',
      'Premium European fittings and ceramic tiles',
      'Double car parking bays & 24/7 security'
    ],
    amenities: [
      'Parking',
      'Lift',
      'Generator',
      'Security',
      'Community Hall',
      'Rooftop Garden'
    ],
    coordinates: [23.7925, 90.4172],
    phone: '09610969620',
    completionYear: '2026',
    handoverDate: 'September 2026'
  },
  {
    id: 'rain-drops',
    name: 'Starpath Rain Drops',
    tagline: 'Serene Green Living in Dhanmondi',
    area: 'Dhanmondi',
    address: 'Dhanmondi, Dhaka',
    block: 'Road 8/A',
    price: '৳2.95 Crore',
    priceRaw: 295,
    size: '2,750 sq. ft.',
    sizeSqft: 2750,
    bedrooms: 4,
    bathrooms: 4,
    parking: 2,
    totalUnits: 14,
    availableUnits: 4,
    soldUnits: 10,
    status: 'Ongoing',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Starpath Rain Drops brings a refreshing, nature-infused urban lifestyle in Dhanmondi. Designed with expansive private balconies, silent power backup, and landscaped terraces.',
    keyFeatures: [
      '2,750 sq. ft. spacious 4-Bedroom layout',
      'Prime residential pocket of Dhanmondi',
      'Acoustic double-glazed glass windows',
      'Landscaped rooftop garden with seating'
    ],
    amenities: [
      'Parking',
      'Lift',
      'Generator',
      'Security',
      'Community Lounge',
      'Rooftop Greenery'
    ],
    coordinates: [23.7461, 90.3742],
    phone: '09610969620',
    completionYear: '2026',
    handoverDate: 'November 2026'
  },
  {
    id: 'royal-firoza',
    name: 'Starpath Royal Firoza',
    tagline: 'Delivered Masterpiece in Uttara',
    area: 'Uttara',
    address: 'Sector 4, Uttara, Dhaka',
    block: 'Sector 4',
    price: '৳1.80 Crore',
    priceRaw: 180,
    size: '2,100 sq. ft.',
    sizeSqft: 2100,
    bedrooms: 3,
    bathrooms: 3,
    parking: 1,
    totalUnits: 18,
    availableUnits: 0,
    soldUnits: 18,
    status: 'Handed Over',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Starpath Royal Firoza stands as a testament to timely delivery and premier construction quality by Starpath Holdings Ltd. Fully completed, handed over, and now home to distinguished families.',
    keyFeatures: [
      'Successfully delivered on schedule',
      '100% sold out and occupied by owners',
      'Seismic-resistant RCC frame construction',
      'Complete standby generator backup & security'
    ],
    amenities: [
      'Parking',
      'Lift',
      'Generator',
      'Security',
      'Community Hall'
    ],
    coordinates: [23.8685, 90.3980],
    phone: '09610969620',
    completionYear: '2024',
    handoverDate: 'Successfully Handed Over'
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-101',
    projectId: 'barakah',
    projectName: 'Starpath Barakah',
    projectArea: 'Banani',
    fullName: 'Mahmudur Rahman',
    phone: '01711223344',
    email: 'mahmud.rahman@example.com',
    message: 'Interested in 4-Bed single unit 3,600 sqft apartment at Banani DOHS.',
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
    message: 'Please send pricing breakdown and payment installment schedule for 2,400 sqft apartment in Block-D.',
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
    message: 'Would like to inquire about loan processing support and handover timeline for Block B.',
    preferredDate: 'Tomorrow, 3:30 PM',
    timestamp: '5 hours ago',
    status: 'Contacted'
  }
];

export const AREAS = [
  { name: 'All', count: 6, image: '/assets/barakah-main.jpg' },
  { name: 'Banani', count: 1, image: '/assets/barakah-main.jpg' },
  { name: 'Bashundhara', count: 1, image: '/assets/peace-harbor.jpg' },
  { name: 'Aftabnagar', count: 1, image: '/assets/anukabbo.jpg' },
  { name: 'Gulshan', count: 1, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80' },
  { name: 'Dhanmondi', count: 1, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80' },
  { name: 'Uttara', count: 1, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80' }
];

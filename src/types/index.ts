export type Area = 'Gulshan' | 'Banani' | 'Bashundhara' | 'Uttara' | 'Dhanmondi' | 'Aftabnagar' | 'All';

export type PropertyStatus = 'Ongoing' | 'Upcoming' | 'Handed Over' | 'Under Construction' | 'Ready to Move' | 'Almost Sold Out';


export interface Amenity {
  id: string;
  name: string;
  iconName: string;
}

export interface Project {
  id: string;
  name: string;
  tagline?: string;
  area: Area;
  address: string;
  block?: string;
  price: string; // e.g. "৳2.50 Cr"
  priceRaw: number; // in Lakhs/Crore for filtering (e.g. 250)
  size: string; // e.g. "2,400 sq. ft."
  sizeSqft: number; // e.g. 2400
  bedrooms: number;
  bathrooms: number;
  parking: number;
  totalUnits: number;
  availableUnits: number;
  soldUnits: number;
  status: PropertyStatus;
  isFeatured?: boolean;
  image: string;
  galleryImages?: string[];
  description: string;
  keyFeatures?: string[];
  amenities: string[];
  coordinates: [number, number]; // [lat, lng]
  phone: string;
  completionYear?: string;
  handoverDate?: string;
}

export interface Inquiry {
  id: string;
  projectId: string;
  projectName: string;
  projectArea: string;
  fullName: string;
  phone: string;
  email: string;
  message: string;
  preferredDate?: string;
  timestamp: string;
  status: 'New' | 'Contacted' | 'Scheduled' | 'Closed';
}

export type TabType = 'home' | 'explore' | 'map' | 'saved' | 'profile' | 'admin';

export interface FilterState {
  searchQuery: string;
  area: Area;
  bedroom: string; // 'all', '3', '4', '4+'
  priceMax: number; // in Crore (e.g., 5.0)
  onlyAvailable: boolean;
  status: string;
}

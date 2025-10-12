export interface City {
  name: string;
  lat: number;
  lng: number;
  wasteCollection: number;
}

export const CITIES: City[] = [
  { name: 'Hyderabad', lat: 17.385, lng: 78.4867, wasteCollection: 450 },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707, wasteCollection: 520 },
  { name: 'Pune', lat: 18.5204, lng: 73.8567, wasteCollection: 380 },
  { name: 'Delhi', lat: 28.7041, lng: 77.1025, wasteCollection: 850 },
  { name: 'Mumbai', lat: 19.076, lng: 72.8777, wasteCollection: 920 },
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946, wasteCollection: 680 },
  { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, wasteCollection: 420 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639, wasteCollection: 750 },
  { name: 'Jaipur', lat: 26.9124, lng: 75.7873, wasteCollection: 340 },
  { name: 'Surat', lat: 21.1702, lng: 72.8311, wasteCollection: 290 },
  { name: 'Lucknow', lat: 26.8467, lng: 80.9462, wasteCollection: 310 },
  { name: 'Kanpur', lat: 26.4499, lng: 80.3319, wasteCollection: 270 },
  { name: 'Nagpur', lat: 21.1458, lng: 79.0882, wasteCollection: 260 },
  { name: 'Indore', lat: 22.7196, lng: 75.8577, wasteCollection: 320 },
  { name: 'Thane', lat: 19.2183, lng: 72.9781, wasteCollection: 240 },
  { name: 'Bhopal', lat: 23.2599, lng: 77.4126, wasteCollection: 280 },
  { name: 'Visakhapatnam', lat: 17.6869, lng: 83.2185, wasteCollection: 230 },
  { name: 'Patna', lat: 25.5941, lng: 85.1376, wasteCollection: 250 },
  { name: 'Vadodara', lat: 22.3072, lng: 73.1812, wasteCollection: 220 },
  { name: 'Ghaziabad', lat: 28.6692, lng: 77.4538, wasteCollection: 210 },
];

export const INDIA_MAP_BOUNDS = {
  center: [22.0, 79.0] as [number, number],
  zoom: 5,
  minZoom: 4,
  maxZoom: 18,
};

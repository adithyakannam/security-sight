export interface Camera {
  id: string;
  name: string;
  location: string;
}

export interface Incident {
  id: string;
  type: string;
  tsStart: string;
  tsEnd: string | null;
  thumbnailUrl: string;
  resolved: boolean;
  camera: Camera;
}

const cameras: Camera[] = [
  {
    id: '1',
    name: 'Shop Floor A',
    location: 'Manufacturing Floor - Section A',
  },
  {
    id: '2', 
    name: 'Vault',
    location: 'Security Vault - Basement Level',
  },
  {
    id: '3',
    name: 'Entrance',
    location: 'Main Building Entrance',
  },
  {
    id: '4',
    name: 'Parking Lot',
    location: 'Employee Parking Area',
  },
];

// Create incidents with realistic timestamps
const now = new Date();
const yesterday = new Date(now);
yesterday.setDate(yesterday.getDate() - 1);

export const mockIncidents: Incident[] = [
  {
    id: '1',
    type: 'Unauthorized Access',
    tsStart: new Date(yesterday.getTime() + 2 * 60 * 60 * 1000).toISOString(),
    tsEnd: new Date(yesterday.getTime() + 2 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString(),
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTufCFseCtAM3UCA9CIB02WBg4kxQD6Z9DNxQ&s',
    resolved: false,
    camera: cameras[0],
  },
  {
    id: '2',
    type: 'Gun Threat',
    tsStart: new Date(yesterday.getTime() + 3 * 60 * 60 * 1000).toISOString(),
    tsEnd: new Date(yesterday.getTime() + 3 * 60 * 60 * 1000 + 2 * 60 * 1000).toISOString(),
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRntsKdlA359lmMkSOD4EjWbt5avuWirwdouw&s',
    resolved: false,
    camera: cameras[1],
  },
  {
    id: '3',
    type: 'Face Recognised',
    tsStart: new Date(yesterday.getTime() + 8 * 60 * 60 * 1000).toISOString(),
    tsEnd: new Date(yesterday.getTime() + 8 * 60 * 60 * 1000 + 1 * 60 * 1000).toISOString(),
    thumbnailUrl: 'https://picsum.photos/640/360?random=1',
    resolved: false,
    camera: cameras[2],
  },
  {
    id: '4',
    type: 'Suspicious Activity',
    tsStart: new Date(yesterday.getTime() + 9 * 60 * 60 * 1000).toISOString(),
    tsEnd: new Date(yesterday.getTime() + 9 * 60 * 60 * 1000 + 10 * 60 * 1000).toISOString(),
    thumbnailUrl: 'https://home-cdn.reolink.us/wp-content/uploads/2024/09/do-parking-garages-have-cameras.jpg',
    resolved: false,
    camera: cameras[3],
  },
  {
    id: '5',
    type: 'Motion Detection',
    tsStart: new Date(yesterday.getTime() + 12 * 60 * 60 * 1000).toISOString(),
    tsEnd: new Date(yesterday.getTime() + 12 * 60 * 60 * 1000 + 3 * 60 * 1000).toISOString(),
    thumbnailUrl: 'https://www.abtosoftware.com/wp-content/uploads/motion-detection-2.png',
    resolved: false,
    camera: cameras[0],
  },
  {
    id: '6',
    type: 'Unauthorized Access',
    tsStart: new Date(yesterday.getTime() + 14 * 60 * 60 * 1000).toISOString(),
    tsEnd: new Date(yesterday.getTime() + 14 * 60 * 60 * 1000 + 7 * 60 * 1000).toISOString(),
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIX7ffJ1l3kaczWakHuJs2nh7GnXQDgXjidQ&s',
    resolved: false,
    camera: cameras[2],
  },
  {
    id: '7',
    type: 'Face Recognised',
    tsStart: new Date(yesterday.getTime() + 15 * 60 * 60 * 1000).toISOString(),
    tsEnd: new Date(yesterday.getTime() + 15 * 60 * 60 * 1000 + 30 * 1000).toISOString(),
    thumbnailUrl: 'https://picsum.photos/640/360?random=2',
    resolved: false,
    camera: cameras[1],
  },
  {
    id: '8',
    type: 'Vehicle Intrusion',
    tsStart: new Date(yesterday.getTime() + 16 * 60 * 60 * 1000).toISOString(),
    tsEnd: new Date(yesterday.getTime() + 16 * 60 * 60 * 1000 + 8 * 60 * 1000).toISOString(),
    thumbnailUrl: 'https://home-cdn.reolink.us/wp-content/uploads/2024/09/do-parking-garages-have-cameras.jpg',
    resolved: false,
    camera: cameras[3],
  },
  {
    id: '9',
    type: 'Equipment Tampering',
    tsStart: new Date(yesterday.getTime() + 18 * 60 * 60 * 1000).toISOString(),
    tsEnd: new Date(yesterday.getTime() + 18 * 60 * 60 * 1000 + 15 * 60 * 1000).toISOString(),
    thumbnailUrl: 'https://picsum.photos/640/360?random=3',
    resolved: false,
    camera: cameras[0],
  },
  {
    id: '10',
    type: 'Loitering',
    tsStart: new Date(yesterday.getTime() + 20 * 60 * 60 * 1000).toISOString(),
    tsEnd: new Date(yesterday.getTime() + 20 * 60 * 60 * 1000 + 25 * 60 * 1000).toISOString(),
    thumbnailUrl: 'https://c8.alamy.com/comp/HXNDGW/unemployed-armenian-men-loitering-on-street-in-village-of-goris-HXNDGW.jpg',
    resolved: false,
    camera: cameras[1],
  },
  {
    id: '11',
    type: 'Motion Detection',
    tsStart: new Date(yesterday.getTime() + 22 * 60 * 60 * 1000).toISOString(),
    tsEnd: new Date(yesterday.getTime() + 22 * 60 * 60 * 1000 + 2 * 60 * 1000).toISOString(),
    thumbnailUrl: 'https://videos.cctvcamerapros.com/wp-content/files/AI-camera-vehicle-detection-scaled.jpg',
    resolved: false,
    camera: cameras[1],
  },
  {
    id: '12',
    type: 'Suspicious Activity',
    tsStart: new Date(yesterday.getTime() + 23 * 60 * 60 * 1000).toISOString(),
    tsEnd: new Date(yesterday.getTime() + 23 * 60 * 60 * 1000 + 12 * 60 * 1000).toISOString(),
    thumbnailUrl: 'https://home-cdn.reolink.us/wp-content/uploads/2024/09/do-parking-garages-have-cameras.jpg',
    resolved: false,
    camera: cameras[3],
  },
];

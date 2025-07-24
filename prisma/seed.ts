import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create cameras
  const cameras = await Promise.all([
    prisma.camera.create({
      data: {
        name: 'Shop Floor A',
        location: 'Manufacturing Floor - Section A',
      },
    }),
    prisma.camera.create({
      data: {
        name: 'Vault',
        location: 'Security Vault - Basement Level',
      },
    }),
    prisma.camera.create({
      data: {
        name: 'Entrance',
        location: 'Main Building Entrance',
      },
    }),
    prisma.camera.create({
      data: {
        name: 'Parking Lot',
        location: 'Employee Parking Area',
      },
    }),
  ]);

  console.log('✅ Created cameras:', cameras.map(c => c.name).join(', '));

  // Create incidents across 24-hour span
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  const incidents = [
    {
      cameraId: cameras[0].id, // Shop Floor A
      type: 'Unauthorized Access',
      tsStart: new Date(yesterday.getTime() + 2 * 60 * 60 * 1000), // 2 hours after midnight
      tsEnd: new Date(yesterday.getTime() + 2 * 60 * 60 * 1000 + 5 * 60 * 1000), // 5 minutes later
      thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTufCFseCtAM3UCA9CIB02WBg4kxQD6Z9DNxQ&s',
      resolved: false,
    },
    {
      cameraId: cameras[1].id, // Vault
      type: 'Gun Threat',
      tsStart: new Date(yesterday.getTime() + 3 * 60 * 60 * 1000), // 3 AM
      tsEnd: new Date(yesterday.getTime() + 3 * 60 * 60 * 1000 + 2 * 60 * 1000), // 2 minutes later
      thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRntsKdlA359lmMkSOD4EjWbt5avuWirwdouw&s',
      resolved: false,
    },
    {
      cameraId: cameras[2].id, // Entrance
      type: 'Face Recognised',
      tsStart: new Date(yesterday.getTime() + 8 * 60 * 60 * 1000), // 8 AM
      tsEnd: new Date(yesterday.getTime() + 8 * 60 * 60 * 1000 + 1 * 60 * 1000), // 1 minute later
      thumbnailUrl: 'https://picsum.photos/640/360?random=1',
      resolved: false,
    },
    {
      cameraId: cameras[3].id, // Parking Lot
      type: 'Suspicious Activity',
      tsStart: new Date(yesterday.getTime() + 9 * 60 * 60 * 1000), // 9 AM
      tsEnd: new Date(yesterday.getTime() + 9 * 60 * 60 * 1000 + 10 * 60 * 1000), // 10 minutes later
      thumbnailUrl: 'https://home-cdn.reolink.us/wp-content/uploads/2024/09/do-parking-garages-have-cameras.jpg',
      resolved: false,
    },
    {
      cameraId: cameras[0].id, // Shop Floor A
      type: 'Motion Detection',
      tsStart: new Date(yesterday.getTime() + 12 * 60 * 60 * 1000), // 12 PM
      tsEnd: new Date(yesterday.getTime() + 12 * 60 * 60 * 1000 + 3 * 60 * 1000), // 3 minutes later
      thumbnailUrl: 'https://www.abtosoftware.com/wp-content/uploads/motion-detection-2.png',
      resolved: false,
    },
    {
      cameraId: cameras[2].id, // Entrance
      type: 'Unauthorized Access',
      tsStart: new Date(yesterday.getTime() + 14 * 60 * 60 * 1000), // 2 PM
      tsEnd: new Date(yesterday.getTime() + 14 * 60 * 60 * 1000 + 7 * 60 * 1000), // 7 minutes later
      thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIX7ffJ1l3kaczWakHuJs2nh7GnXQDgXjidQ&s',
      resolved: false,
    },
    {
      cameraId: cameras[1].id, // Vault
      type: 'Face Recognised',
      tsStart: new Date(yesterday.getTime() + 15 * 60 * 60 * 1000), // 3 PM
      tsEnd: new Date(yesterday.getTime() + 15 * 60 * 60 * 1000 + 30 * 1000), // 30 seconds later
      thumbnailUrl: 'https://picsum.photos/640/360?random=2',
      resolved: false,
    },
    {
      cameraId: cameras[3].id, // Parking Lot
      type: 'Vehicle Intrusion',
      tsStart: new Date(yesterday.getTime() + 16 * 60 * 60 * 1000), // 4 PM
      tsEnd: new Date(yesterday.getTime() + 16 * 60 * 60 * 1000 + 8 * 60 * 1000), // 8 minutes later
      thumbnailUrl: 'https://home-cdn.reolink.us/wp-content/uploads/2024/09/do-parking-garages-have-cameras.jpg',
      resolved: false,
    },
    {
      cameraId: cameras[0].id, // Shop Floor A
      type: 'Equipment Tampering',
      tsStart: new Date(yesterday.getTime() + 18 * 60 * 60 * 1000), // 6 PM
      tsEnd: new Date(yesterday.getTime() + 18 * 60 * 60 * 1000 + 15 * 60 * 1000), // 15 minutes later
      thumbnailUrl: 'https://picsum.photos/640/360?random=3',
      resolved: false,
    },
    {
      cameraId: cameras[2].id, // Entrance
      type: 'Loitering',
      tsStart: new Date(yesterday.getTime() + 20 * 60 * 60 * 1000), // 8 PM
      tsEnd: new Date(yesterday.getTime() + 20 * 60 * 60 * 1000 + 25 * 60 * 1000), // 25 minutes later
      thumbnailUrl: 'https://c8.alamy.com/comp/HXNDGW/unemployed-armenian-men-loitering-on-street-in-village-of-goris-HXNDGW.jpg',
      resolved: false,
    },
    {
      cameraId: cameras[1].id, // Vault
      type: 'Motion Detection',
      tsStart: new Date(yesterday.getTime() + 22 * 60 * 60 * 1000), // 10 PM
      tsEnd: new Date(yesterday.getTime() + 22 * 60 * 60 * 1000 + 2 * 60 * 1000), // 2 minutes later
      thumbnailUrl: 'https://videos.cctvcamerapros.com/wp-content/files/AI-camera-vehicle-detection-scaled.jpg',
      resolved: false,
    },
    {
      cameraId: cameras[3].id, // Parking Lot
      type: 'Suspicious Activity',
      tsStart: new Date(yesterday.getTime() + 23 * 60 * 60 * 1000), // 11 PM
      tsEnd: new Date(yesterday.getTime() + 23 * 60 * 60 * 1000 + 12 * 60 * 1000), // 12 minutes later
      thumbnailUrl: 'https://home-cdn.reolink.us/wp-content/uploads/2024/09/do-parking-garages-have-cameras.jpg',
      resolved: false,
    },
  ];

  const createdIncidents = await Promise.all(
    incidents.map((incident) => 
      prisma.incident.create({ data: incident })
    )
  );

  console.log(`✅ Created ${createdIncidents.length} incidents`);
  console.log(' Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

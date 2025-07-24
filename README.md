# SecureSight CCTV Monitoring Dashboard

A modern full-stack CCTV monitoring application built with Next.js 15, Prisma, and TypeScript.

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ installed
- **npm** or **yarn** package manager
- **Git** for cloning the repository

### Installation & Setup

1. **Clone the repository** (if applicable) or navigate to the project directory:
```bash
cd secure-sight-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up the database:**
```bash
# Generate Prisma client
npx prisma generate

# Create and setup database
npx prisma db push

# Seed with sample data
npx prisma db seed
```

4. **Start the development server:**
```bash
npm run dev
```

5. **Open your browser:**
   - Go to [http://localhost:3000](http://localhost:3000)
   - The SecureSight dashboard should load with sample incidents

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open database browser |
| `npx prisma db seed` | Reseed database |

## 🗄️ Database Commands

### View Database
```bash
# Open Prisma Studio (visual database browser)
npx prisma studio
```

### Reset Database
```bash
# Reset database and reseed
npx prisma db push --force-reset
npx prisma db seed
```

### Generate New Data
```bash
# If you modify the schema
npx prisma generate
npx prisma db push
```

## 🔧 Project Structure

```
secure-sight-app/
├── app/                     # Next.js 15 App Router
│   ├── api/                 # API routes
│   │   └── incidents/       # Incident endpoints
│   ├── components/          # React components
│   │   ├── Navbar.tsx
│   │   ├── IncidentPlayer.tsx
│   │   └── IncidentList.tsx
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── prisma/
│   ├── schema.prisma        # Database schema
│   ├── seed.ts              # Sample data
│   └── dev.db               # SQLite database
├── public/
│   └── thumbnails/          # Incident thumbnails
└── package.json
```

## 🎯 Features

### Dashboard Overview
- **4 Camera Locations**: Shop Floor A, Vault, Entrance, Parking Lot
- **12+ Incident Types**: Unauthorized Access, Gun Threat, Motion Detection, etc.
- **Real-time Filtering**: Toggle between active and resolved incidents
- **Optimistic UI**: Instant feedback when resolving incidents

### Key Functionality
1. **Browse Incidents**: View all security incidents from the database
2. **Select Incident**: Click any incident to load it in the video player
3. **Resolve Incidents**: Mark incidents as resolved with the resolve button
4. **Filter by Status**: Toggle between showing all incidents or just active ones
5. **View Details**: See camera location, timestamps, and incident types

## 🔌 API Endpoints

The application provides RESTful API endpoints:

### Get Incidents
```bash
# Get all incidents
curl http://localhost:3000/api/incidents

# Get only unresolved incidents
curl http://localhost:3000/api/incidents?resolved=false

# Get only resolved incidents
curl http://localhost:3000/api/incidents?resolved=true
```

### Resolve Incident
```bash
# Toggle resolution status of an incident
curl -X PATCH http://localhost:3000/api/incidents/[incident-id]/resolve
```

## 🛠️ Development

### Running in Development Mode
```bash
npm run dev
```
- Hot reload enabled
- Development database at `prisma/dev.db`
- Access at http://localhost:3000

### Building for Production
```bash
npm run build
npm run start
```

### Database Development
```bash
# Reset everything and start fresh
npx prisma db push --force-reset
npx prisma db seed

# View data in browser
npx prisma studio
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Database Not Found
```bash
Error: Environment variable not found: DATABASE_URL
```
**Solution:**
```bash
# Make sure .env file exists with:
echo 'DATABASE_URL="file:./dev.db"' > .env
npx prisma db push
```

#### 2. Prisma Client Not Generated
```bash
Error: Cannot find module '@prisma/client'
```
**Solution:**
```bash
npx prisma generate
```

#### 3. No Sample Data
```bash
# If dashboard shows empty, reseed database:
npx prisma db seed
```

#### 4. Port Already in Use
```bash
Error: Port 3000 is already in use
```
**Solution:**
- Stop other applications using port 3000
- Or Next.js will automatically use another port (3001, 3002, etc.)

#### 5. Dependencies Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 📊 Sample Data

The seed script creates:

### Cameras
- **Shop Floor A** (Manufacturing Floor - Section A)
- **Vault** (Security Vault - Basement Level)
- **Entrance** (Main Building Entrance)
- **Parking Lot** (Employee Parking Area)

### Incident Types
- Unauthorized Access
- Gun Threat
- Face Recognition
- Suspicious Activity
- Motion Detection
- Vehicle Intrusion
- Equipment Tampering
- Loitering

### Timeline
- Incidents span 24 hours with realistic timestamps
- Mix of resolved and active incidents
- Various durations (30 seconds to 25 minutes)

## 🎨 UI Features

### Incident Player (Left Panel)
- Large video display area
- Incident information overlay
- Playback controls (play/pause, progress, volume)
- Camera identification labels

### Incident List (Right Panel)
- Thumbnail previews
- Color-coded incident types
- Camera location and timestamp
- One-click resolution
- Status filtering

### Dashboard Controls
- Filter toggle (All/Active incidents)
- System status indicators
- Quick action buttons
- Real-time incident counts

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# Optional: For production
# DATABASE_URL="postgresql://user:password@localhost:5432/securesight"
```

## 📱 Browser Compatibility

- **Chrome** 90+ (Recommended)
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🚀 Deployment

### Development
```bash
npm run dev
# Access at http://localhost:3000
```

### Production
```bash
npm run build
npm run start
# Access at http://localhost:3000
```

### Environment Setup
- Ensure `.env` file is configured
- Database should be accessible
- All dependencies installed

## 📋 Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Database**: SQLite (development), Prisma ORM
- **Styling**: Tailwind CSS v4
- **Build Tools**: npm, tsx

## 🎯 Getting Started Checklist

- [ ] Node.js 18+ installed
- [ ] Project dependencies installed (`npm install`)
- [ ] Database generated (`npx prisma generate`)
- [ ] Database pushed (`npx prisma db push`)
- [ ] Sample data seeded (`npx prisma db seed`)
- [ ] Development server running (`npm run dev`)
- [ ] Browser open at http://localhost:3000
- [ ] Dashboard loads with incident data

## 🆘 Need Help?

1. **Check the console** for error messages
2. **Verify all dependencies** are installed
3. **Ensure database** is properly set up
4. **Try resetting** the database if issues persist
5. **Check Node.js version** (should be 18+)

---

**Happy Monitoring!** 🔍 Your SecureSight dashboard should now be running successfully.

require('dotenv').config();
const mongoose = require('mongoose');
const JobRequest = require('./models/JobRequest');

const sampleJobs = [
  {
    title: 'Leaking kitchen tap',
    description: 'The cold water tap in the kitchen has been dripping constantly for two weeks. Needs a washer replacement or full tap fitting.',
    category: 'Plumbing',
    location: 'Glasgow',
    contactName: 'Liam Henderson',
    contactEmail: 'liam.henderson@email.com',
    status: 'Open',
  },
  {
    title: 'Burst pipe under bathroom sink',
    description: 'A pipe under the bathroom basin has cracked and is causing water damage to the cabinet below. Urgent repair needed.',
    category: 'Plumbing',
    location: 'Edinburgh',
    contactName: 'Sophie Wallace',
    contactEmail: 'sophie.wallace@email.com',
    status: 'In Progress',
  },
  {
    title: 'Rewire living room sockets',
    description: 'Three wall sockets in the living room are dead after a power surge. Need a qualified electrician to inspect and rewire.',
    category: 'Electrical',
    location: 'London',
    contactName: 'James Carter',
    contactEmail: 'j.carter@email.com',
    status: 'Open',
  },
  {
    title: 'Install outdoor security lighting',
    description: 'Requesting installation of two PIR-activated security lights at the front and rear of the property.',
    category: 'Electrical',
    location: 'Manchester',
    contactName: 'Amara Osei',
    contactEmail: 'amara.osei@email.com',
    status: 'Closed',
  },
  {
    title: 'Repaint entire hallway and staircase',
    description: 'Hallway and staircase walls need stripping back, filling, and repainting in a light grey. Two coats required.',
    category: 'Painting',
    location: 'Edinburgh',
    contactName: 'Fiona MacLeod',
    contactEmail: 'fiona.macleod@email.com',
    status: 'Open',
  },
  {
    title: 'Touch-up exterior window frames',
    description: 'Wooden window frames on the front of the house are peeling and need sanding, priming, and repainting in white gloss.',
    category: 'Painting',
    location: 'Glasgow',
    contactName: 'Mark Doyle',
    contactEmail: 'mark.doyle@email.com',
    status: 'In Progress',
  },
  {
    title: 'Fit custom wardrobe in master bedroom',
    description: 'Looking for a joiner to design and build a fitted wardrobe with sliding doors in the master bedroom (approx. 3m wide).',
    category: 'Joinery',
    location: 'London',
    contactName: 'Priya Sharma',
    contactEmail: 'priya.sharma@email.com',
    status: 'Open',
  },
  {
    title: 'Replace rotten garden fence panels',
    description: 'Six fence panels along the rear boundary have rotted through. Need panels removed and replaced with new timber panels.',
    category: 'Joinery',
    location: 'Manchester',
    contactName: 'Tom Griffiths',
    contactEmail: 'tom.griffiths@email.com',
    status: 'Closed',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Clear existing data
    await JobRequest.deleteMany({});
    console.log('Existing job requests cleared');

    // Insert sample data
    const inserted = await JobRequest.insertMany(sampleJobs);
    console.log(`Seeded ${inserted.length} jobs`);

  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
};

seedDB();

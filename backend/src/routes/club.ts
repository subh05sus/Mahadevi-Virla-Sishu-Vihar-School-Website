// src/routes/clubs.ts
import express, { Request, Response } from 'express';
import multer from 'multer';
import verifyToken from '../middleware/auth';
import Club from '../models/Club'; // Ensure ClubDocument is correctly imported
import cloudinary from "cloudinary";
import mongoose from 'mongoose';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Helper function to upload image to Cloudinary
async function uploadImage(image: Express.Multer.File) {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
}

// Create a new club
router.post('/', verifyToken, upload.single('image'), async (req: Request, res: Response) => {
  try {
    const { name, description, assignedTeacher } = req.body;

    // Ensure req.file is defined
    let imageUrl = '';
    if (req.file) {
      imageUrl = await uploadImage(req.file);
    }

    const newClub = new Club({ name, description, assignedTeacher, imageUrl, events: [] });
    await newClub.save();
    res.status(201).json(newClub);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create club' });
  }
});

// Add event to a club
router.post('/:clubId/events', verifyToken, async (req: Request, res: Response) => {
    try {
      const { clubId } = req.params;
      const { date, heading, content, time, place, topics } = req.body;
      const club = await Club.findById(clubId);
      if (!club) {
        return res.status(404).json({ message: 'Club not found' });
      }
  
      club.events = club.events || []; // Ensure events array is initialized
  
      club.events.push({
        date, heading, content, time, place, topics, registrations: [],
        _id: new mongoose.Types.ObjectId() // Generate new ObjectId for _id
      });
  
      await club.save();
      res.status(201).json(club);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add event' });
    }
  });
  

// Fetch all clubs
router.get('/', async (req: Request, res: Response) => {
  try {
    const clubs = await Club.find();
    res.status(200).json(clubs); // Send the clubs as a response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch clubs' });
  }
});

// Fetch events for a club
router.get('/:clubId/events', async (req: Request, res: Response) => {
  try {
    const { clubId } = req.params;
    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }
    res.status(200).json(club.events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});



router.get('/events/:eventId', async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;

    const clubs = await Club.find();

    let foundEvent = null;
    let foundClubId = null;

    clubs.some(club => {
      foundEvent = club.events.find(event => event._id.toString() === eventId);
      if (foundEvent) {
        foundClubId = club._id.toString(); // Extract club ID if event is found
      }
      return !!foundEvent; // Exit loop if event is found
    });

    if (!foundEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Return event details and club ID
    res.status(200).json({ event: foundEvent, clubId: foundClubId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch event details' });
  }
});

  

// Register for an event
router.post('/:clubId/events/:eventId/register', async (req: Request, res: Response) => {
  try {
    const { clubId, eventId } = req.params;
    const { studentName,phone, email } = req.body;
    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }
    
    // Find event by ID within the club's events array
    const event = club.events.find(event => event._id.toString() === eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Ensure registrations array is initialized
    event.registrations = event.registrations || [];
    
    // Push new registration to registrations array
    event.registrations.push({ studentName,phone, email });
    await club.save();
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to register for event' });
  }
});

// View all registrations
router.get('/registrations', verifyToken, async (req: Request, res: Response) => {
  try {
    // Fetch all clubs with populated events and registrations
    const clubs = await Club.find().populate({
      path: 'events',
      populate: {
        path: 'registrations',
      },
    });

    // Prepare registrations in the desired structure
    const registrations = clubs.flatMap(club =>
      club.events.flatMap(event =>
        event.registrations.map(registration => ({
          clubName: club.name, // Assuming club name is stored in 'name' field of Club model
          eventName: event.heading, // Assuming event heading is stored in 'heading' field of Event model
          studentName: registration.studentName,
          email: registration.email,
          phone: registration.phone || '', // Assuming phone is an optional field
        }))
      )
    );

    // Send the registrations as JSON response
    res.status(200).json(registrations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch registrations' });
  }
});


router.get('/:clubId/events', async (req: Request, res: Response) => {
  try {
    const { clubId } = req.params;
    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }
    res.status(200).json(club.events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

// Fetch details of a club
router.get('/:clubId', async (req: Request, res: Response) => {
  try {
    const { clubId } = req.params;
    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }
    res.status(200).json(club);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch club details' });
  }
});

router.delete('/:clubId', async (req: Request, res: Response) => {
  try {
    const { clubId } = req.params;
    const club = await Club.findByIdAndDelete(clubId);
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }
    res.status(200).json({ message: 'Club deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete club' });
  }
});

router.delete('/:clubId/events/:eventId', async (req: Request, res: Response) => {
  try {
    const { clubId, eventId } = req.params;
    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }
    const event = club.events.find(event => event._id.toString() === eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    club.events = club.events.filter(event => event._id.toString() !== eventId);
    await club.save();
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete event' });
  }
});


export default router;

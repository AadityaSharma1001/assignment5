import dbConnect from '../../../lib/dbConnect';
import Bus from '../../../models/Bus';
import { authMiddleware } from '../../../utils/auth';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();

  const { authorization } = req.headers;
  const token = authorization?.split(' ')[1];
  const { isAdmin } = jwt.verify(token, process.env.JWT_SECRET);

  if (!isAdmin) return res.status(403).json({ error: 'Admin only' });

  const { route, price, departureTime, seats } = req.body;
  if (!route || !price || !departureTime || !seats) {
    return res.status(400).json({ error: 'All fields required' });
  }

  await dbConnect();
  const bus = new Bus({ route, price, departureTime, seatsAvailable: seats });
  await bus.save();
  res.status(201).json({ message: 'Bus created', bus });
};

export default authMiddleware(handler);

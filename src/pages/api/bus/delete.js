import dbConnect from '../../../lib/dbConnect';
import Bus from '../../../models/Bus';
import { authMiddleware } from '../../../utils/auth';
import jwt from 'jsonwebtoken';

const handler = async (req, res) => {
  if (req.method !== 'DELETE') return res.status(405).end();

  const { authorization } = req.headers;
  const token = authorization?.split(' ')[1];
  const { isAdmin } = jwt.verify(token, process.env.JWT_SECRET);

  if (!isAdmin) return res.status(403).json({ error: 'Admin only' });

  const { id } = req.query;
  await dbConnect();
  await Bus.findByIdAndDelete(id);
  res.status(200).json({ message: 'Bus deleted' });
};

export default authMiddleware(handler);

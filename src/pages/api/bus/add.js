import dbConnect from '@/lib/dbConnect';
import Bus from '@/models/Bus';
import { authMiddleware } from '@/utils/auth';

export default authMiddleware(async (req, res) => {
  await dbConnect();
  if (req.method === 'POST') {
    const bus = await Bus.create(req.body);
    res.status(201).json({ success: true, bus });
  } else {
    res.status(405).end();
  }
});

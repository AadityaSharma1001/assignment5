import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'POST') {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    try {
      const user = await User.create({ name, email, password: hashed });
      res.status(201).json({ success: true });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  } else {
    res.status(405).end();
  }
}

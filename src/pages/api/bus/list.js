import dbConnect from '@/lib/dbConnect';
import Bus from '@/models/Bus';

export default async function handler(req, res) {
  await dbConnect();
  const buses = await Bus.find({});
  res.status(200).json({ buses });
}

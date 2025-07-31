import dbConnect from '@/lib/dbConnect';
import Ticket from '@/models/Ticket';
import Bus from '@/models/Bus';
import { authMiddleware } from '@/utils/auth';

export default authMiddleware(async (req, res) => {
  await dbConnect();

  const rawTickets = await Ticket.find({ userId: req.userId }).populate({
    path: 'busId',
    model: Bus,
  });

  const tickets = rawTickets.map(ticket => {
    const t = ticket.toObject();
    t.bus = t.busId;
    delete t.busId;
    return t;
  });
  res.status(200).json({ tickets });
});

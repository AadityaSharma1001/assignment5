import dbConnect from '@/lib/dbConnect';
import Ticket from '@/models/Ticket';
import Bus from '@/models/Bus';
import { authMiddleware } from '@/utils/auth';

export default authMiddleware(async (req, res) => {
  await dbConnect();
  const userId = req.userId;
  const { busId } = req.body;

  const bus = await Bus.findById(busId);
  if (!bus) {
    return res.status(400).json({ success: false, message: 'No seats available' });
  }

  // 🔥 Dynamic Pricing Logic
  let dynamicPrice = bus.price;

  // Rule 1: Fewer seats available
  if (bus.seatsAvailable <= 5) {
    dynamicPrice *= 1.10;
  }

  // Rule 2: Booking close to departure
  const timeUntilDeparture = new Date(bus.departureTime) - Date.now();
  const hoursLeft = timeUntilDeparture / (1000 * 60 * 60);
  if (hoursLeft <= 2) {
    dynamicPrice *= 1.15;
  }

  dynamicPrice = Math.ceil(dynamicPrice); // round off to nearest ₹

  // Update seat count
  bus.seatsAvailable -= 1;
  await bus.save();

  const ticket = await Ticket.create({
    userId,
    busId,
    code: Math.random().toString(36).substr(2, 10),
    pricePaid: dynamicPrice   // 🆕 Save dynamic price
  });

  await ticket.populate('busId');

  res.status(200).json({ success: true, ticket });
});

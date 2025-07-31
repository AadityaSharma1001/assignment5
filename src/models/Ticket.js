import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus' }, // Add ref here
  bookingTime: { type: Date, default: Date.now },
  code: String
});


export default mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);

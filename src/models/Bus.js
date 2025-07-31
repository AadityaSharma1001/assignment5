import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
  route: String,
  departureTime: Date,
  price: Number,
  seatsAvailable: Number
});

export default mongoose.models.Bus || mongoose.model('Bus', busSchema);

import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    motto: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    totalPoints: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export const Team = mongoose.model('Team', teamSchema);
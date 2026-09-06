import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sets: { type: Number, min: 1 },
    reps: { type: Number, min: 1 },
    seconds: { type: Number, min: 1 },
  },
  { _id: false },
);

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true, enum: ['Strength', 'Cardio', 'Mobility'] },
    difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: { type: [exerciseSchema], required: true },
  },
  { timestamps: true },
);

export const Workout = mongoose.model('Workout', workoutSchema);
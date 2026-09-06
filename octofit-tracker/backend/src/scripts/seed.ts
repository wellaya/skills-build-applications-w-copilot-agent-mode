import mongoose from 'mongoose';

import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [maya, jordan, priya, sam] = await User.insertMany([
      { username: 'maya-chen', email: 'maya@example.com', displayName: 'Maya Chen', avatarColor: '#e76f51' },
      { username: 'jordan-lee', email: 'jordan@example.com', displayName: 'Jordan Lee', avatarColor: '#2a9d8f' },
      { username: 'priya-shah', email: 'priya@example.com', displayName: 'Priya Shah', avatarColor: '#e9c46a' },
      { username: 'sam-rivera', email: 'sam@example.com', displayName: 'Sam Rivera', avatarColor: '#457b9d' },
    ]);

    const [trailblazers, sunrise] = await Team.insertMany([
      {
        name: 'Trailblazers',
        motto: 'Small steps, strong finish.',
        members: [maya._id, jordan._id],
        totalPoints: 1840,
      },
      {
        name: 'Sunrise Squad',
        motto: 'Show up before the day starts.',
        members: [priya._id, sam._id],
        totalPoints: 1625,
      },
    ]);

    await Activity.insertMany([
      {
        user: maya._id,
        activityType: 'Run',
        durationMinutes: 36,
        distanceKm: 5.2,
        calories: 410,
        completedAt: new Date('2026-09-04T07:15:00Z'),
      },
      {
        user: jordan._id,
        activityType: 'Strength',
        durationMinutes: 45,
        calories: 320,
        completedAt: new Date('2026-09-04T18:00:00Z'),
      },
      {
        user: priya._id,
        activityType: 'Ride',
        durationMinutes: 52,
        distanceKm: 18.4,
        calories: 530,
        completedAt: new Date('2026-09-05T06:45:00Z'),
      },
      {
        user: sam._id,
        activityType: 'Yoga',
        durationMinutes: 28,
        calories: 150,
        completedAt: new Date('2026-09-05T07:30:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { user: maya._id, team: trailblazers._id, points: 980, weeklyStreak: 6, rank: 1 },
      { user: priya._id, team: sunrise._id, points: 910, weeklyStreak: 5, rank: 2 },
      { user: jordan._id, team: trailblazers._id, points: 860, weeklyStreak: 4, rank: 3 },
      { user: sam._id, team: sunrise._id, points: 715, weeklyStreak: 3, rank: 4 },
    ]);

    await Workout.insertMany([
      {
        title: 'Lunch Break Power',
        description: 'A focused full-body circuit for a strong midday reset.',
        category: 'Strength',
        difficulty: 'Beginner',
        durationMinutes: 20,
        exercises: [
          { name: 'Bodyweight squat', sets: 3, reps: 12 },
          { name: 'Incline push-up', sets: 3, reps: 10 },
          { name: 'Dead bug', sets: 3, reps: 8 },
        ],
      },
      {
        title: 'Weekend Endurance',
        description: 'Build steady aerobic capacity with a progressive interval session.',
        category: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 35,
        exercises: [
          { name: 'Easy warm-up', seconds: 300 },
          { name: 'Fast interval', seconds: 90 },
          { name: 'Recovery interval', seconds: 120 },
        ],
      },
      {
        title: 'Evening Mobility Flow',
        description: 'Release the day with controlled mobility work for hips and shoulders.',
        category: 'Mobility',
        difficulty: 'Beginner',
        durationMinutes: 15,
        exercises: [
          { name: 'Worlds greatest stretch', seconds: 60 },
          { name: '90/90 hip switch', reps: 10 },
          { name: 'Child pose breathing', seconds: 120 },
        ],
      },
    ]);

    console.log('Database seeding complete: 4 users, 2 teams, 4 activities, 4 leaderboard entries, and 3 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

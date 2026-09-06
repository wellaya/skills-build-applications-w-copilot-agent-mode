import express from 'express';

import { Activity } from './models/activity.js';
import { Leaderboard } from './models/leaderboard.js';
import { Team } from './models/team.js';
import { User } from './models/user.js';
import { Workout } from './models/workout.js';
import './config/database.js';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api', apiBaseUrl });
});

app.get('/api/users/', async (_request, response) => {
  response.json(await User.find().sort({ displayName: 1 }).lean());
});

app.get('/api/teams/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'displayName username avatarColor').sort({ totalPoints: -1 }).lean());
});

app.get('/api/activities/', async (_request, response) => {
  response.json(await Activity.find().populate('user', 'displayName username').sort({ completedAt: -1 }).lean());
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json(await Leaderboard.find().populate('user', 'displayName username').populate('team', 'name').sort({ rank: 1 }).lean());
});

app.get('/api/workouts/', async (_request, response) => {
  response.json(await Workout.find().sort({ title: 1 }).lean());
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
});

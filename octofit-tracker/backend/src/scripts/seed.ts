import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

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

    const teams = await Team.create([
      {
        name: 'Trailblazers',
        description: 'Weekend runners and outdoor explorers.',
      },
      {
        name: 'Strength Circle',
        description: 'A supportive team focused on building strength.',
      },
    ]);

    const users = await User.create([
      {
        username: 'maya_runs',
        email: 'maya@example.com',
        name: 'Maya Chen',
        teamId: teams[0]._id,
      },
      {
        username: 'jordan_lifts',
        email: 'jordan@example.com',
        name: 'Jordan Brooks',
        teamId: teams[1]._id,
      },
      {
        username: 'sam_moves',
        email: 'sam@example.com',
        name: 'Sam Rivera',
        teamId: teams[0]._id,
      },
    ]);

    await Team.bulkWrite([
      { updateOne: { filter: { _id: teams[0]._id }, update: { members: [users[0]._id, users[2]._id] } } },
      { updateOne: { filter: { _id: teams[1]._id }, update: { members: [users[1]._id] } } },
    ]);

    await Activity.create([
      { userId: users[0]._id, type: 'Running', durationMinutes: 35, points: 70, recordedAt: new Date('2026-08-16') },
      { userId: users[1]._id, type: 'Strength training', durationMinutes: 45, points: 90, recordedAt: new Date('2026-08-17') },
      { userId: users[2]._id, type: 'Walking', durationMinutes: 50, points: 50, recordedAt: new Date('2026-08-18') },
    ]);

    await Leaderboard.create([
      { userId: users[1]._id, points: 320, rank: 1 },
      { userId: users[0]._id, points: 280, rank: 2 },
      { userId: users[2]._id, points: 240, rank: 3 },
    ]);

    await Workout.create([
      {
        title: 'Steady State Run',
        description: 'A conversational-paced run to build aerobic endurance.',
        difficulty: 'beginner',
        durationMinutes: 30,
        activities: ['Warm-up walk', 'Easy run', 'Cool-down stretch'],
      },
      {
        title: 'Full Body Foundation',
        description: 'A balanced strength session using bodyweight movements.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        activities: ['Squats', 'Push-ups', 'Reverse lunges', 'Plank'],
      },
      {
        title: 'Power Intervals',
        description: 'Short, challenging intervals for experienced athletes.',
        difficulty: 'advanced',
        durationMinutes: 25,
        activities: ['Sprint intervals', 'Mountain climbers', 'Burpees'],
      },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log('Database seeding complete: 3 users, 2 teams, 3 activities, 3 leaderboard entries, 3 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

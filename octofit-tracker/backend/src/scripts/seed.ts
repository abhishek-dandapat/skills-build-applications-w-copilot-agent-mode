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

    const db = mongoose.connection.db;
    if (db) {
      await db.dropDatabase();
    }

    const teams = await Team.insertMany([
      { name: 'Velocity', coach: 'Coach Rivera', color: '#4f46e5', members: 3 },
      { name: 'Summit', coach: 'Coach Patel', color: '#10b981', members: 2 },
      { name: 'Core Crew', coach: 'Coach Nguyen', color: '#f59e0b', members: 2 }
    ]);

    const users = await User.insertMany([
      { name: 'Aiden Brooks', email: 'aiden@example.com', teamName: 'Velocity', fitnessLevel: 'Advanced', points: 1280, streak: 18, isActive: true },
      { name: 'Maya Chen', email: 'maya@example.com', teamName: 'Velocity', fitnessLevel: 'Intermediate', points: 1120, streak: 14, isActive: true },
      { name: 'Leo Martinez', email: 'leo@example.com', teamName: 'Summit', fitnessLevel: 'Advanced', points: 1385, streak: 21, isActive: true },
      { name: 'Priya Shah', email: 'priya@example.com', teamName: 'Summit', fitnessLevel: 'Beginner', points: 940, streak: 9, isActive: true },
      { name: 'Noah Kim', email: 'noah@example.com', teamName: 'Core Crew', fitnessLevel: 'Intermediate', points: 1015, streak: 12, isActive: true },
      { name: 'Emma Davis', email: 'emma@example.com', teamName: 'Core Crew', fitnessLevel: 'Advanced', points: 1190, streak: 16, isActive: true }
    ]);

    await Activity.insertMany([
      { userId: 'aiden-01', userName: 'Aiden Brooks', type: 'Running', durationMinutes: 42, distanceMiles: 5.4, notes: 'Tempo interval run' },
      { userId: 'maya-01', userName: 'Maya Chen', type: 'Strength', durationMinutes: 50, distanceMiles: 0, notes: 'Upper body circuit' },
      { userId: 'leo-01', userName: 'Leo Martinez', type: 'Cycling', durationMinutes: 38, distanceMiles: 15.2, notes: 'Hill interval ride' },
      { userId: 'priya-01', userName: 'Priya Shah', type: 'Yoga', durationMinutes: 28, distanceMiles: 0, notes: 'Recovery flow' },
      { userId: 'noah-01', userName: 'Noah Kim', type: 'Swimming', durationMinutes: 35, distanceMiles: 1.1, notes: 'Lap drill sets' }
    ]);

    await Leaderboard.insertMany([
      { name: 'Leo Martinez', points: 1385, teamName: 'Summit', rank: 1 },
      { name: 'Aiden Brooks', points: 1280, teamName: 'Velocity', rank: 2 },
      { name: 'Emma Davis', points: 1190, teamName: 'Core Crew', rank: 3 },
      { name: 'Maya Chen', points: 1120, teamName: 'Velocity', rank: 4 },
      { name: 'Noah Kim', points: 1015, teamName: 'Core Crew', rank: 5 }
    ]);

    await Workout.insertMany([
      {
        title: 'Power Intervals',
        category: 'Cardio',
        durationMinutes: 35,
        difficulty: 'Advanced',
        focus: ['Speed', 'Endurance', 'Recovery']
      },
      {
        title: 'Strength Builder',
        category: 'Strength',
        durationMinutes: 45,
        difficulty: 'Intermediate',
        focus: ['Legs', 'Core', 'Mobility']
      },
      {
        title: 'Mobility Reset',
        category: 'Recovery',
        durationMinutes: 20,
        difficulty: 'Beginner',
        focus: ['Flexibility', 'Balance', 'Breathing']
      }
    ]);

    console.log(
      `Seeded ${teams.length} teams, ${users.length} users, 5 activities, 5 leaderboard entries, and 3 workouts.`
    );
    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();

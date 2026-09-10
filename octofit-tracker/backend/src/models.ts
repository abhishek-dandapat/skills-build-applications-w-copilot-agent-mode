import mongoose, { type Document, type Model, type Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  teamName?: string;
  fitnessLevel: string;
  points: number;
  streak: number;
  isActive: boolean;
}

export interface ITeam extends Document {
  name: string;
  coach: string;
  color: string;
  members: number;
}

export interface IActivity extends Document {
  userId?: string;
  userName: string;
  type: string;
  durationMinutes: number;
  distanceMiles?: number;
  notes?: string;
}

export interface ILeaderboardEntry extends Document {
  name: string;
  points: number;
  teamName?: string;
  rank: number;
}

export interface IWorkout extends Document {
  title: string;
  category: string;
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  focus: string[];
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    teamName: { type: String, default: 'Unassigned' },
    fitnessLevel: { type: String, default: 'Starter' },
    points: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const teamSchema = new mongoose.Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    coach: { type: String, required: true },
    color: { type: String, default: '#4f46e5' },
    members: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const activitySchema = new mongoose.Schema<IActivity>(
  {
    userId: { type: String, default: '' },
    userName: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceMiles: { type: Number, default: 0 },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

const leaderboardSchema = new mongoose.Schema<ILeaderboardEntry>(
  {
    name: { type: String, required: true },
    points: { type: Number, default: 0 },
    teamName: { type: String, default: 'Unassigned' },
    rank: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const workoutSchema = new mongoose.Schema<IWorkout>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    focus: [{ type: String }],
  },
  { timestamps: true }
);

export const User = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', userSchema);
export const Team = (mongoose.models.Team as Model<ITeam>) || mongoose.model<ITeam>('Team', teamSchema);
export const Activity =
  (mongoose.models.Activity as Model<IActivity>) || mongoose.model<IActivity>('Activity', activitySchema);
export const Leaderboard =
  (mongoose.models.Leaderboard as Model<ILeaderboardEntry>) ||
  mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
export const Workout =
  (mongoose.models.Workout as Model<IWorkout>) || mongoose.model<IWorkout>('Workout', workoutSchema);

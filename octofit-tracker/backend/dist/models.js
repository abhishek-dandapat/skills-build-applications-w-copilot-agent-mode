import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    teamName: { type: String, default: 'Unassigned' },
    fitnessLevel: { type: String, default: 'Starter' },
    points: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
const teamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    coach: { type: String, required: true },
    color: { type: String, default: '#4f46e5' },
    members: { type: Number, default: 0 },
}, { timestamps: true });
const activitySchema = new mongoose.Schema({
    userId: { type: String, default: '' },
    userName: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceMiles: { type: Number, default: 0 },
    notes: { type: String, default: '' },
}, { timestamps: true });
const leaderboardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    points: { type: Number, default: 0 },
    teamName: { type: String, default: 'Unassigned' },
    rank: { type: Number, default: 1 },
}, { timestamps: true });
const workoutSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    focus: [{ type: String }],
}, { timestamps: true });
export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);
export const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
export const Leaderboard = mongoose.models.Leaderboard ||
    mongoose.model('Leaderboard', leaderboardSchema);
export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

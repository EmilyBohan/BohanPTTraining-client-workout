import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema, model } = mongoose;

// Example user data
const dummyUser = {
  _id: "6341a1234abcd5678ef0d0c3",
  name: {
    firstname: "Jane",
    lastname: "Doe",
  },
  email: "janedoe@example.com",
  username: "jane_doe",
  role: "client",
  isGoogleAuth: false,
  associated_clients: ["6341b4567efg1234hij0d0a1"], // Only if the user is a coach
  metrics: {
    age: 28,
    weight: 150, // in lbs
    height: {
      feet: 5,
      inches: 7,
    },
    waist_circumference: 32,
  },
  workout_history: ["6341a8f4b2d94b001b23d4e5"],
  goals: [
    {
      _id: "6343a1234abc9876df8e0d0c",
      set_date: "2024-10-01T08:00:00.000Z",
      description: "Run a 5K",
      completed_date: null,
      target_date: "2024-12-01T08:00:00.000Z",
    },
  ],
  progress_photos: [
    {
      _id: "6344a1b5f5a1b9001c8c9e0d",
      date_added: "2024-09-10T10:00:00.000Z",
      photo_url: "https://example.com/photos/janedoe/2024-09-10.jpg",
      notes: "First progress photo",
    },
  ],
  eval_notes: [
    {
      _id: "6345c1d2e6f7a8b9009d1c0e",
      date: "2024-10-15T14:30:00.000Z",
      note: "Great improvement in endurance",
      written_by: "6341b4567efg1234hij0d0a1", // ID of the coach
    },
  ],
  createdAt: "2024-08-15T12:00:00.000Z",
  updatedAt: "2024-10-20T12:30:00.000Z",
};

// Sub-documents https://mongoosejs.com/docs/subdocs.html
const GoalSchema = new Schema({
  // When the goal was set
  set_date: {
    type: Date,
    default: Date.now,
  },
  // What is the goal?
  description: {
    type: String,
    required: true,
  },
  // When the goal was completed
  completed_date: Date,
  // When the goal is due?
  target_date: Date,
});

const ProgressPhotoSchema = new Schema({
  // Data photo was added
  date_added: {
    type: Date,
    default: Date.now,
  },
  // URL on Cloudinary
  photo_url: {
    type: String,
    required: true,
  },
  // Notes about the photo
  notes: String,
});

const EvalNoteSchema = new Schema({
  // Evaluations?
  date: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: String,
    required: true,
  },
  written_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Main User Schema
const UserSchema = new Schema(
  {
    name: {
      firstname: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        minLength: [2, "First name must be at least 2 characters long"],
      },
      lastname: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        minLength: [2, "Last name must be at least 2 characters long"],
      },
    },
    // Could add validation for email format?
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minLength: [3, "Username must be at least 3 characters long"],
    },
    password: {
      type: String,
      // Required if not using Google Auth
      required: function () {
        return !this.isGoogleAuth;
      },
      minLength: [8, "Password must be at least 8 characters long"],
    },
    isGoogleAuth: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "client", "coach"],
      default: "client",
      required: true,
    },
    associated_clients: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true,
      },
    ],
    metrics: {
      age: {
        type: Number,
        required: true,
        min: [16, "Must be at least 16 years old"],
        max: [120, "Age must be reasonable"],
      },
      weight: {
        type: Number,
        required: true,
        min: [60, "Weight must be at least 60 lbs"],
      },
      height: {
        feet: {
          type: Number,
          required: true,
          min: [4, "Height must be at least 4 feet"],
        },
        inches: {
          type: Number,
          required: true,
          min: [0, "Height must be at least 0 inches"],
          max: [11, "Height must be at most 11 inches"],
        },
      },
      waist_circumference: {
        type: Number,
        min: [20, "Waist circumference must be at least 20 inches"],
      },
    },
    workout_history: [
      {
        type: Schema.Types.ObjectId,
        ref: "Workout",
      },
    ],
    goals: [GoalSchema],
    progress_photos: [ProgressPhotoSchema],
    eval_notes: [EvalNoteSchema],
  },
  {
    timestamps: true,
  },
);

// Password hash middleware.
UserSchema.pre("save", async function save(next) {
  if (!this.isModified("password") || this.isGoogleAuth) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    return next(err);
  }
});

// Helper method for validating user's password.

UserSchema.methods = {
  comparePassword: async function (candidatePassword) {
    try {
      return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
      throw err;
    }
  },

  addGoal: function (goalData) {
    this.goals.push(goalData);
    return this.save();
  },

  completeGoal: async function (goalId) {
    const goal = this.goals.id(goalId);
    if (!goal) throw new Error("Goal not found");
    goal.completed_date = new Date();
    return this.save();
  },

  addProgressPhoto: function (photoData) {
    this.progress_photos.push(photoData);
    return this.save();
  },

  addEvalNote: function (noteData) {
    this.eval_notes.push(noteData);
    return this.save();
  },

  getActiveGoals: function () {
    return this.goals.filter((goal) => !goal.completed_date);
  },

  getCompletedWorkouts: function () {
    return this.workout_history.filter((workout) => workout.completed_date);
  },

  updateMetrics: function (metricsData) {
    Object.assign(this.metrics, metricsData);
    return this.save();
  },
};

// Static methods
UserSchema.statics = {
  findByEmail(email) {
    return this.findOne({ email: email.toLowerCase() });
  },

  findClients(coachId) {
    return this.find({
      _id: { $in: coachId.associated_clients },
    });
  },

  findCoaches() {
    return this.find({ role: "coach" });
  },
};

// Don't keep the password on the user object
UserSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

export const User = model("User", UserSchema);

import mongoose from "mongoose";
const { Schema, model } = mongoose;

const SetSchema = new Schema({
  reps: {
    type: Number,
    required: true,
    min: [1, "Reps must be at least 1"],
  },
  weight: {
    type: Number,
    required: true,
    min: [0, "Weight cannot be negative"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  notes: String,
});

const ExerciseEntrySchema = new Schema({
  exercise_id: {
    type: Schema.Types.ObjectId,
    ref: "Exercise",
    required: true,
    index: true, // Adding index for efficient querying
  },
  sets: [SetSchema],
});

const WorkoutSchema = new Schema(
  {
    // Set by coach but user editable?
    scheduled_date: {
      type: Date,
      required: [true, "Scheduled date is required"],
      index: true,
    },
    // Set by user when they complete the workout
    completed_date: {
      type: Date,
    },
    // Name of the workout - eg 'shoulder joy'
    workout_title: {
      type: String,
      required: [true, "Workout title is required"],
      trim: true,
    },
    // Links to assigned user
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    // Always Emily for now but might be useful for future
    trainer_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Trainer ID is required"],
    },
    // Written by trainer, show to user in front end
    trainer_notes: String,
    // User reflections on workout
    user_notes: String,
    // Array of exercises with sets and reps
    exercises: [ExerciseEntrySchema],
  },
  {
    timestamps: true,
  },
);

// Methods
WorkoutSchema.methods = {
  markCompleted: function () {
    if (!this.completed_date) {
      this.completed_date = new Date();
      return this.save();
    } else {
      throw new Error("Workout already marked as completed");
    }
  },

  isCompleted: function () {
    return !!this.completed_date;
  },

  addExercise: function (exerciseData) {
    this.exercises.push(exerciseData);
    return this.save();
  },

  updateSet: function (exerciseIndex, setIndex, setData) {
    const exercise = this.exercises[exerciseIndex];
    const set = exercise && exercise.sets[setIndex];
    if (!exercise || !set) {
      throw new Error("Exercise or set not found");
    }
    Object.assign(set, setData);
    return this.save();
  },
};

// Static methods - Queries that might be used in the future
WorkoutSchema.statics = {
  findIncomplete: function (userId) {
    return this.find({
      user_id: userId,
      completed_date: null,
    })
      .sort({ scheduled_date: 1 })
      .populate("exercises.exercise_id");
  },

  findByDateRange: function (userId, startDate, endDate) {
    return this.find({
      user_id: userId,
      scheduled_date: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .sort({ scheduled_date: 1 })
      .populate("exercises.exercise_id");
  },
};

WorkoutSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v; // Remove MongoDB version key
    return ret;
  },
});

export const Workout = model("Workout", WorkoutSchema);

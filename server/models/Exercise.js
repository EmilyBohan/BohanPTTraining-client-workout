import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ExerciseSchema = new Schema(
  {
    // Exercise name
    exercise_title: {
      type: String,
      required: [true, "Exercise title is required"],
      trim: true,
      index: true,
    },
    // Array of muscle groups the exercise targets
    target_muscle: [
      {
        type: String,
        enum: [
          "chest",
          "back",
          "shoulders",
          "legs",
          "arms",
          "core",
          "fullBody",
        ],
        lowercase: true,
        trim: true,
      },
    ],
    // How to do the exercise
    instructions: {
      type: String,
      required: [true, "Instructions are required"],
      minLength: [10, "Instructions must be at least 10 characters long"],
    },
    // Video link - Does it have to be on YouTube? If so could add validation here
    video: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Queries that might be run on the model - eg find all exercises that target the chest
ExerciseSchema.statics = {
  findByMuscleGroup(muscleGroup) {
    return this.find({ target_muscle: muscleGroup.toLowerCase() });
  },

  findWithVideo() {
    return this.find({ video: { $exists: true, $ne: null } });
  },
};

// JSON formatting
ExerciseSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export const Exercise = model("Exercise", ExerciseSchema);

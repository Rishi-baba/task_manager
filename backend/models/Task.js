import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;

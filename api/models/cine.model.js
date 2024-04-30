const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cineSchema = new Schema(
  {
    name: {
      type: String,
      required: "Name is required",
    },
    movieTheaters: {
      type: Number,
      required: "Movie Theaters is required",
    },
    description: {
      type: String,
      required: "Description is required",
    },
    web: {
      type: String,
    },
    category: {
      type: String,
      enum: ["Small", "Medium", "Big"],
      required: "Category is required",
    },
    avatar: {
      type: String,
      required: "Avatar is required",
    },
    bgAvatar: {
      type: String,
      required: "Background Avatar is required",
    },
    phoneNumber: {
      type: Number,
      required: "Phone Number is required",
    },
    address: {
      type: String,
      required: "Address is required",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        ret.location = ret.location.coordinates.reverse();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

cineSchema.index({ location: "2dsphere" });

const Cine = mongoose.model("Cine", cineSchema);
module.exports = Cine;

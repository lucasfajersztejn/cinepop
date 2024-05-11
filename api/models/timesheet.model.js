const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeSheetSchema = new Schema(
  {
    idCinema: {
      type: Schema.Types.ObjectId,
      ref: "Cinema",
      required: true,
    },
    idMovie: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    dateStart: {
      type: Date,
      required: true,
    },
    dateFinish: {
      type: Date,
      required: true,
    },
    schedules: {
      type: {
        monday: [String],
        tuesday: [String],
        wednesday: [String],
        thursday: [String],
        friday: [String],
        saturday: [String],
        sunday: [String],
      },
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const TimeSheet = mongoose.model("TimeSheet", timeSheetSchema);
module.exports = TimeSheet;


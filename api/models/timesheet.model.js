const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeSheetSchema = new Schema(
  {
    idCine: {
      type: Schema.Types.ObjectId,
      ref: "Cine",
      required: true,
    },
    idPelicula: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    empieza: {
      type: Date,
      required: true,
    },
    termina: {
      type: Date,
      required: true,
    },
    horario: {
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

/* 
Modelo Timesheet
idCine: ObjectId
idPelicula: objectId
empieza: Date
termina: Date
horario: { lunes: [8 / 10, 15], martes: [8 / 12 / 19] ....} (
*/

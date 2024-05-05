const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    adult: {
      type: Boolean,
      required: "Adult is required",
    },
    backdrop_path: {
      type: String,
      required: "backdropPath is required",
    },
    genre_ids: {
      type: [String],
    },
    idMovie: {
      type: Number,
      required: "idMovie is required",
    },
    original_language: {
      type: String,
    },
    original_title: {
      type: String,
      required: "Title is required",
    },
    overview: {
      type: String,
      required: "overview is required",
    },
    popularity: {
      type: Number,
    },
    poster_path: {
      type: String,
      required: "PosterPath is required",
    },
    release_date: {
      type: String,
      required: "Release date is required",
    },
    title: {
      type: String,
      required: "title is required",
    },
    video: {
      type: Boolean,
    },
    vote_average: {
      type: Number,
      required: "Vote average is required",
    },
    vote_count: {
      type: Number,
    },
    youtube_key: {
      type: String,
    },
    cast: [{
      name: {
        type: String,
      },
      original_name: {
        type: String,
      },
      character: {
        type: String,
      },
      profile_path: {
        type: String,
      },
    }],
    director: {
      name: {
        type: String,
      },
      original_name: {
        type: String,
      },
      profile_path: {
        type: String,
      },
      job: {
        type: String,
      },
    },
    runTime: {
      type: Number,
    },
    certification: {
      type: String
    }
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

movieSchema.virtual("timesheets", {
  ref: "TimeSheet",
  localField: "_id",
  foreignField: "idMovie",
  justOne: false,
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;

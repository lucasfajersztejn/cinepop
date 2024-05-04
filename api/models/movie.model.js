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

/*
{
  "adult": false,
  "backdrop_path": "/4woSOUD0equAYzvwhWBHIJDCM88.jpg",
  "genre_ids": [
    28,
    27,
    53
  ],
  "idMovie": 1096197,
  "original_language": "en",
  "original_title": "No Way Up",
  "overview": "Characters from different backgrounds are thrown together when the plane they're travelling on crashes into the Pacific Ocean. A nightmare fight for survival ensues with the air supply running out and dangers creeping in from all sides.",
  "popularity": 2011.445,
  "poster_path": "/hu40Uxp9WtpL34jv3zyWLb5zEVY.jpg",
  "release_date": "2024-01-18",
  "title": "No Way Up",
  "video": false,
  "vote_average": 6.503,
  "vote_count": 486,
  "key": "UJa1zUYegqo",
}

{
      "iso_639_1": "en",
      "iso_3166_1": "US",
      "name": "Clip",
      "key": "UJa1zUYegqo",
      "site": "YouTube",
      "size": 1080,
      "type": "Clip",
      "official": true,
      "published_at": "2024-02-16T16:31:54.000Z",
      "id": "65d40e001d356301631e68cb"
    }
*/

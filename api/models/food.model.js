const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema(
  {
    name: {
      type: String,
      require: "Name is require",
    }
  }
)

/*
Name (String - require)
Avatar (String - require)
Description (String - require)
Price (Number - require)
Type (String - require) Normal - Special
*/
import { Schema, model } from "mongoose";

const schema = new Schema({
  Name: String,
  Age: Number,
  Club: String,
  Image: String,
  Nationality: String,
  Position: String,
  Value: String,
  Score: Number,
});

export default model("PlayerSchema", schema);

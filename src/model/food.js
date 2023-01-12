import mongoose from "mongoose";

const { Schema } = mongoose;
const foodSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "Please type a name"],
      unique: true,
    },

    type: {
      type: String,
      required: [true, "Please enter the type of the food"],
      unique: false,
    },

    calorias: {
      type: Number,
      required: [true, "Plese type the number of calories"],
      unique: false,
    },
    gluten: {
      type: Boolean,
      required: [true, "Please define if contains gluten"],
      unique: false,
    },
  },
  {
    collection: "Food",
    timestamps: true,
  }
);

export default mongoose.model("Food", foodSchema);

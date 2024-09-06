import { Schema } from "mongoose";

const recipeSchema = new Schema(
  {
    recipeName: {
      type: String,
      required: [true, "Recipe name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    file: {
      type: String, 
      required: false,
    },
    ingredients: [
      {
        name: {
          type: String,
          required: [true, "Ingredient name is required"],
        },
      },
    ],
  },
  {
    timestamps: true, 
  }
);

export default recipeSchema;

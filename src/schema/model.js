import { model } from "mongoose";
import userSchema from "./userSchema.js";
import recipeSchema from "./recipeSchema.js";

export const User = model ("User",userSchema);
export const Recipe = model ("Recipe",recipeSchema);
import { Router } from "express";
import {
  createRecipe,
  deleteRecipe,
  readAllRecipes,
  readSpecificRecipe,
} from "../controller/recipeController.js";
import upload from "../middleware/upload.js";

const recipeRouter = Router();
recipeRouter.route("/")
.post(upload.single('file'), createRecipe)
.get(readAllRecipes);

recipeRouter
.route("/:recipeId")
.get(readSpecificRecipe)
.delete(deleteRecipe);

export default recipeRouter;
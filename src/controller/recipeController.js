import { Recipe } from "../schema/model.js";

export let createRecipe = async (req, res) => {
  try {
    // Log request body and file for debugging purposes
    console.log("------ Request Body:", req.body);
    console.log("------ Uploaded Files:", req.file);

    // Parse the ingredients field if it's a JSON string
    let ingredients;
    try {
      ingredients = JSON.parse(req.body.ingredients); // Manually parse the ingredients field
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON format in ingredients field",
      });
    }

    // Check if any files are uploaded
    // let fileLinks =
    //   req.files && req.files.length > 0
    //     ? req.files.map((file) => `localhost:8000/${file.filename}`)
    //     : null;

    //if upload.single(file) then to retrive this , req.file.filename

    let link = `localhost:8000/${req.file.filename}`;

    // Prepare the data for saving to the database
    let recipeData = {
      recipeName: req.body.recipeName,
      description: req.body.description,
      ingredients: ingredients, // Parsed array of ingredient objects
      file: link, 
    };

    // Save the recipe to the database
    let result = await Recipe.create(recipeData);

    // Send a success response
    res.status(200).json({
      success: true,
      message: "Recipe created successfully.",
      result: result,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export let readAllRecipes = async (req, res) => {
  try {
    let result = await Recipe.find({});

    res.status(200).json({
      success: true,
      message: "Recipes retrieved successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export let readSpecificRecipe = async (req, res) => {
  let recipeId = req.params.recipeId;
  try {
    let result = await Recipe.findById(recipeId);

    res.status(200).json({
      success: true,
      message: "Recipe retrieved successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export let deleteRecipe = async (req, res) => {
  let recipeId = req.params.recipeId;

  try {
    let result = await Recipe.findByIdAndDelete(recipeId);

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

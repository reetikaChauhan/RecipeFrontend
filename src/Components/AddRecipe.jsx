import React, { useState } from "react";
import axios from "axios";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    prepTimeMin: "",
    cookTimeMin: "",
    servings: "",
    steps:""
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
     if (name === "steps") {
      setRecipe({ ...recipe, steps: value.split("\n") });
  } else {
      setRecipe({ ...recipe, [name]: value });
  }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "recipe",
      new Blob([JSON.stringify(recipe)], { type: "application/json" })
    );

    axios
      .post("http://localhost:8080/api/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product added successfully:", response.data);
        alert("Recipe added successfully");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Error adding Recipe");
      });
  };

  return (
    <div className="container">
    <div className="center-container">
      <form className="row g-3 pt-5" onSubmit={submitHandler}>
        <div className="col-md-6">
          <label className="form-label">
            <h6>Title</h6>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Recipe Title"
            onChange={handleInputChange}
            value={recipe.title}
            name="title"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">
            <h6>Prep Time in minutes</h6>
          </label>
          <input
            type="number"
            name="prepTimeMin"
            className="form-control"
            placeholder="Enter your prep time in minutes"
            value={recipe.prepTimeMin}
            onChange={handleInputChange}
            id="prepTimeMin"
          />
        </div>
        <div className="col-12">
          <label className="form-label">
            <h6>Description</h6>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Add product description"
            value={recipe.description}
            name="description"
            onChange={handleInputChange}
            id="description"
          />
        </div>
        <div className="col-5">
          <label className="form-label">
            <h6>Cooking Time in minutes</h6>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Cooking time in minutes eg: 15"
            onChange={handleInputChange}
            value={recipe.cookTimeMin}
            name="cookTimeMin"
            id="cookTimeMin"
          />
        </div>
     
        <div className="col-md-6">
          <label className="form-label">
            <h6>Steps to cook</h6>
          </label>
          <textarea
                className="form-control"
                name="steps"
                id="steps"
                rows={5}
                value={Array.isArray(recipe.steps) ? recipe.steps.join("\n") : ""} // assuming steps is an array
                onChange={handleInputChange}
            ></textarea>
        </div>

        <div className="col-md-4">
          <label className="form-label">
            <h6>Servings</h6>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter no.of servings"
            onChange={handleInputChange}
            value={recipe.servings}
            name="servings"
            id="servings"
          />
        </div>
     
        <div className="col-md-4">
          <label className="form-label">
            <h6>Image</h6>
          </label>
          <input
            className="form-control"
            type="file"
            onChange={handleImageChange}
          />
        </div>
       
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            // onClick={submitHandler}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddRecipe;

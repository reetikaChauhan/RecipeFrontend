import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [image, setImage] = useState();
  const [updateRecipe, setUpdateRecipe] = useState({
    id: null,
    title: "",
    description: "",
    prepTimeMin: "",
    cookTimeMin: "",
    servings: "",
    steps:""
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/recipes/${id}`
        );

        setRecipe(response.data);
      
        const responseImage = await axios.get(
          `http://localhost:8080/api/recipes/${id}/image`,
          { responseType: "blob" }
        );
       const imageFile = await converUrlToFile(responseImage.data,response.data.imageName)
        setImage(imageFile);     
        setUpdateRecipe(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

   fetchRecipe();
  }, [id]);

  useEffect(() => {
    console.log("image Updated", image);
  }, [image]);



  const converUrlToFile = async(blobData, fileName) => {
    const file = new File([blobData], fileName, { type: blobData.type });
    return file;
  }
 
  const handleSubmit = async(e) => {
    e.preventDefault();
   //  console.log("images", image)
    //console.log("updated recipes", updateRecipe)
    const updatedRecipe = new FormData();
    updatedRecipe.append("imageFile", image);
    updatedRecipe.append(
      "recipe",
      new Blob([JSON.stringify(updateRecipe)], { type: "application/json" })
    );
  

  console.log("formData : ", updatedRecipe)
    axios
      .put(`http://localhost:8080/api/recipes/${id}`, updatedRecipe, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product updated successfully:", updatedRecipe);
        alert("Product updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        console.log("product unsuccessfull update",updatedRecipe)
        alert("Failed to update product. Please try again.");
      });
  };
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "steps") {
      setUpdateRecipe({ ...updateRecipe, steps: value.split("\n") });
  } else {
      setUpdateRecipe({ ...updateRecipe, [name]: value });
  }
  };
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  

  return (
    <div className="update-product-container" >
      <div className="center-container"style={{marginTop:"7rem"}}>
        <h1>Update Recipe</h1>
        <form className="row g-3 pt-1" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Title</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={recipe.title}
              value={updateRecipe.title}
              onChange={handleChange}
              name="title"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Servings</h6>
            </label>
            <input
              type="text"
              name="servings"
              className="form-control"
              placeholder={recipe.servings}
              value={updateRecipe.servings}
              onChange={handleChange}
              id="servings"
            />
          </div>
          <div className="col-12">
            <label className="form-label">
              <h6>Description</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={recipe.description}
              name="description"
              onChange={handleChange}
              value={updateRecipe.description}
              id="description"
            />
          </div>
          <div className="col-5">
            <label className="form-label">
              <h6>Prep Time in minutes</h6>
            </label>
            <input
              type="number"
              className="form-control"
              onChange={handleChange}
              value={updateRecipe.prepTimeMin}
              placeholder={recipe.prepTimeMin}
              name="prepTimeMin"
              id="prepTimeMin"
            />
          </div>
          <div className="col-md-6">
           <label className="form-label">
                <h6>Steps</h6>
            </label>
            <textarea
                className="form-control"
                name="steps"
                id="steps"
                onChange={handleChange}
                rows={5}
                value={Array.isArray(updateRecipe.steps) ? updateRecipe.steps.join("\n") : ""} 
                placeholder={recipe.steps}
            ></textarea>
          </div>

          <div className="col-md-4">
            <label className="form-label">
              <h6>Cooking Time in minutes</h6>
            </label>
            <input
              type="number"
              className="form-control"
              onChange={handleChange}
              placeholder={recipe.cookTimeMin}
              value={updateRecipe.cookTimeMin}
              name="cookTimeMin"
              id="cookTimeMin"
            />
          </div>
          <div className="col-md-8">
            <label className="form-label">
              <h6>Image</h6>
            </label>
            <img
              src={image ? URL.createObjectURL(image) : "Image unavailable"}
              alt={recipe.imageName}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                padding: "5px",
                margin: "0",
              }}
            />
            <input
              className="form-control"
              type="file"
              onChange={handleImageChange}
              placeholder="Upload image"
              name="imageUrl"
              id="imageUrl"
            />
          </div>
          <div className="col-12">
            <div className="form-check">
              
              <label className="form-check-label">Do you want to update these changes , click on submit button below</label>
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRecipe;
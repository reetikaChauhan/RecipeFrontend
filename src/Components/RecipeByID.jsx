import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useState } from "react";
import AppContext from "../Context/Context";
import axios from "../axios";

const RecipeById = () => {
  const { id } = useParams();
  const { data, refreshData } =
    useContext(AppContext);
  const [recipe, setRecipe] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/recipes/${id}`
        );
        setRecipe(response.data);
        if (response.data.imageName) {
          fetchImage();
        }
      } catch (error) {
        console.error("Error fetching RECIPE:", error);
      }
    };

    const fetchImage = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/recipes/${id}/image`,
        { responseType: "blob" }
      );
      setImageUrl(URL.createObjectURL(response.data));
    };

    fetchRecipe();
  }, [id]);

  const deleteRecipe = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/recipes/${id}`);
      console.log("Product deleted successfully");
      alert("Recipe deleted successfully");
      refreshData();
      navigate("/");
    } catch (error) {
      console.error("Error deleting Recipe:", error);
    }
  };

  const handleEditClick = () => {
    navigate(`/recipe/update/${id}`);
  };

 
  if (!recipe) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Loading...
      </h2>
    );
  }
  return (
    <>
      <div className="containers" style={{ display: "flex" }}>
        <img
          className="left-column-img"
          src={imageUrl}
          alt={recipe.imageName}
          style={{ width: "50%", height: "50%" }}
        />

        <div className="right-column" style={{ width: "50%" }}>
          <div className="product-description">
            <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem",textTransform: 'capitalize', letterSpacing:'1px' }}>
              {recipe.title}
            </h1>
            <p style={{fontWeight:'bold',fontSize:'1rem',margin:'10px 0px 0px'}}>RECIPE DESCRIPTION :</p>
            <p style={{ marginBottom: "1rem" }}>{recipe.description}</p>
            <h3>Steps:</h3>
            <ol>
                {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
                ))}
            </ol>
          </div>

          <div className="product-price">
            <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
              {"Prep Time in minutes" + recipe.prepTimeMin}
            </span>
             <span style={{ fontSize: "2rem", fontWeight: "bold" }}>
              {"Cooking Time in minutes" + recipe.cookTimeMin}
            </span>
          </div>
          <div className="update-button" style={{ display: "flex", gap: "1rem" }}>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleEditClick}
              style={{
                padding: "1rem 2rem",
                fontSize: "1rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Update
            </button>
            {/* <UpdateProduct product={product} onUpdate={handleUpdate} /> */}
            <button
              className="btn btn-primary"
              type="button"
              onClick={deleteRecipe}
              style={{
                padding: "1rem 2rem",
                fontSize: "1rem",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeById;
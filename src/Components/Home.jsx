import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import Recipe from './Recipe';
import unplugged from "../assets/unplugged.png"

const Home = () => {
  const { data, isError,  refreshData } = useContext(AppContext);
  const [recipes, setRecipes] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateRecipes = async () => {
        const updatedRecipes = await Promise.all(
          data.map(async (recipe) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/recipes/${recipe.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...recipe, imageUrl };
            } catch (error) {
              console.error(
                "Error fetching image for Recipe ID:",
                recipe.id,
                error
              );
              return { ...recipe, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setRecipes(updatedRecipes);
      };

      fetchImagesAndUpdateRecipes();
    }
  }, [data]);

 

  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "18rem" }}>
      <img src={unplugged} alt="Error" style={{ width: '100px', height: '100px' }}/>
      </h2>
    );
  }
  return (
    
         <>
        <div className='top-head'>
            <a href='#'>Find a Recipe</a>
            <p>|</p>
            <a href='#'>Help</a>
            <p>|</p>
            <a href='#'>Join us</a>
            <p>|</p>
            <a href='#'>Sign In</a>
        </div>
        <div className='head'>
            <div className='navbar'>
                <div className='bnb'>
                    <a href='#' className='bnb'><h4>Recipes</h4></a>
                </div>
                <div className='center-links'>
                    <a href='#' className='stays'><h6>Diet</h6></a>
                    <a href='#'className='experiences'><h6>Experineces</h6></a>
                    <a href='#'className='onlineexperiences'><h6>Online Coach</h6></a>
                </div>
            </div> 
            <div className='heading'>
                <div className='head-text'> <h4>Learn About Delicious Recipes</h4></div>
            </div>  
        </div>
      <div className='rental-shoppingcart'>
        <div className='rental'>
          <section className="image-gallery">
            <Recipe recipelist = {recipes} />
          </section>
        </div>

      
      </div>
      <div className='footer-section'>
        <div className='row-1'>
          <ul>
            <li><h6>Support</h6></li>
            <li>Help Center</li>
            <li>AirCover</li>
            <li>Anti-discrimination</li>
            <li>Disability support</li>
            <li>Cancellation options</li>
          </ul>
        </div>
        <div className='row-2'>
          <ul>
            <h6>Hosting</h6>
            <li>Recipes at Home</li>
            <li>AirCover for Hosts</li>
            <li>Hosting resources</li>
            <li>Community forum</li>
            <li>Hosting responsibly</li>
          </ul>
        </div>
        <div className='row-2'>
          <ul>
            <h6>Recipes</h6>
            <li>Newsroom</li>
            <li>New features</li>
            <li>Careers</li>
            <li>Investors</li>
            <li>Hosting responsibly</li>
          </ul>
        </div>
      </div>
    </>
  )
}  

export default Home;

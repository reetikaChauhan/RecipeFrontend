import '../App.css';
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Recipe({recipelist}){
    return(
    <>
    {
        recipelist.map((bnb,index) =>{
           const { id, title, description, prepTimeMin, cookTimeMin,servings, imageUrl } =
              bnb;
          return(
            <Link
                  to={`/recipe/${id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
            >
            <div className="img-card" key={`bnb-${index}`}>
                <div className='image'>
                    <img src={imageUrl} alt="image"/>  
                    <div className='text'>
                      <button> <h6>{title}</h6> </button>    
                    </div> 
                    <div className='reviews'>
                        <span className="material-symbols-outlined"></span>
                    </div>
                </div>
                <div className='location'>
                    <p><b>Description:</b> {description}</p>
                </div>
                <div className='title'>
                    <p><b>Servings:</b> {servings}</p>
                    <p><b>Prep Time :</b> {prepTimeMin}</p>
                    <p><b>Cooking Time:</b> {cookTimeMin}</p>
                </div> 
            </div>
            </Link>
          )
        })
    }
    
    </>
   )
}
Recipe.propTypes = {
recipelist: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Recipe;
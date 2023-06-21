import React from "react";

export default function Card({name, image, weight,temperament}){
    return(
        <div >
           
            
            <div >
                <h3>{name}</h3>
                
                     <img src={image} alt="img not found" width="250px" height="200px" /> 
                
                
            </div>
            <div >
             <h4>peso: {weight} kg</h4>
            <h5>temperamentos: {temperament}</h5>   
            </div>
        </div>
    )
};

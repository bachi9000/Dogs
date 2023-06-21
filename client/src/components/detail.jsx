import React from "react";
import {Link} from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getDetail } from "../Redux/action";
import { useEffect } from "react";

export default function Detail(props){
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    },[dispatch])
    const myDog=useSelector((state)=>state.detail)
    console.log(myDog);
    return(
        <div>
            {
                myDog.length>0? 
                <div>
                    <h1>Nombre: {myDog[0].name}</h1>
                    <img src={myDog[0].image} width="700px" height="500px" />
                    <p>Altura: {myDog[0]. height}</p>
                    <p>Peso: {myDog[0].weight}</p>
                    <h3>Años de vida: {myDog[0].life_span}</h3>
                    <h4>Temperamentos: {!myDog[0].createdInDb? myDog[0].temperament + ' ': myDog[0].Temperaments +' ' }</h4>
                    
                </div> : <p>Loading..</p>
            }
            <Link to='/home'>
                <button>Volver</button>
            </Link>
        </div>
    )

}




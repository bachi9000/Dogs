import React,{useState,useEffect} from "react";
import {Link,useHistory} from 'react-router-dom';
import {postDogs,getAllTemperaments} from '../Redux/action'
import {useDispatch, useSelector} from 'react-redux';

function validate(input){
    let errors={};
    if(!input.name){
        errors.name='Se requiere un nombre'}
        else if(!input.life_span){
            errors.life_span='Años de vida debe ser completado'
        }
        else if(!input.image){
            errors.image='se requiere imagen'
        }
    return errors;
}

export default function DogsCreate(){
    const dispatch =useDispatch();
    const history=useHistory();
    const temperaments=useSelector((state)=>state.allTemperaments)
    const [errors,setErrors]=useState({});
    const[aux,setAux]=useState({
        pesoMin:'',
        pesoMax:'',
        alturaMax:'',
        alturaMin:''
    })
    const [input,setInput]=useState({
        name:'',
        height:'',
        weight:'',
        life_span:'',
        image:'',
        temperament:[]
       
    })
    function handleChangeAux(e){
        setAux({
            ...aux,
            [e.target.name]:e.target.value
        })
    }
     
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
        console.log(input)
    };
    function handleSelect(e){
        setInput({
            ...input,
           temperament: [...input.temperament, e.target.value]
        })
    };
    function handleSubmit(e){
        e.preventDefault();
        input.weight=aux.pesoMin+ ' - '+ aux.pesoMax
        input.height=aux.alturaMin+ ' - '+ aux.alturaMax
        console.log(input)
        dispatch(postDogs(input))
        alert("Personaje Creado!!")
        setInput({
            name:'',
            height:'',
            weight:'',
            life_span:'',
            image:'',
            temperament:[]
            
        })
        setAux({ 
        pesoMin:'',
        pesoMax:'',
        alturaMax:'',
        alturaMin:''
    })
        history.push('/home')
    };

    useEffect(()=>{
        dispatch(getAllTemperaments());
        
    },[]);


return(
    <div>
        <Link to='/home'>
            <button>Volver</button>
        </Link>
        <form onSubmit={(e)=> handleSubmit(e)}>
            <div>
                <label > Raza: </label>
                <input type="text" value={input.name} name='name' onChange={handleChange}/>
             {errors.name &&(
                //el classname es para el estilo
                <p >{errors.name}</p>
            )} 
            </div>

            <div>
                <label >Altura mínima: </label>
                <input type="text" value={input.alturaMin} name='alturaMin' onChange={(e)=>  handleChangeAux(e)} />   
            </div>
            <div>
                <label >Altura máxima: </label>
                <input type="text" value={aux.alturaMax} name='alturaMax' onChange={(e)=> handleChangeAux(e)} />   
            </div>
            
            <div>
                <label >Peso mínimo: </label>
                <input type="text" value={aux.pesoMin} name='pesoMin' onChange={(e)=> handleChangeAux(e)} />   
            </div>
            <div>
                <label >Peso máximo: </label>
                <input type="text" value={aux.pesoMax} name='pesoMax' onChange={(e)=> handleChangeAux(e)} />   
            </div>

            <div>
                <label>Años de vida: </label>
                <input type="text" value={input.life_span} name='life_span' onChange={(e)=>handleChange(e)}/>
            </div>
            {errors.life_span &&(
               
                <p >{errors.life_span}</p>
            )} 
            <div>
                <label >Imagen: </label>
                <input type="text" value={input.image} name='image' onChange={(e)=>handleChange(e)}/>
            </div>
            {errors.image &&(
               
               <p >{errors.image}</p>
           )} 
            <select onChange={(e)=> handleSelect(e)}>
                {temperaments.map((occ)=>(
                    <option value={occ.name}>{occ.name} </option>
                ))}
            </select>
            <ul><li>{input.temperament.map(el=> el +" ,")}</li></ul>
            
            <button type='submit'>Crear Dog</button>

            </form>
        </div>
)

}



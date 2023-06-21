import React from 'react';
import {Link} from 'react-router-dom';
import{useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getAllDogs,getAllTemperaments,filterDogs,filterOrigen,order} from '../Redux/action';
import SearchBar from './searchBar';
import Paginado from './paginado';
import Card from './card';


// https://api.thedogapi.com/v1/breeds/search?q={raza_perro}
const Home=()=>{
    const dispatch=useDispatch();
    const allDogs=useSelector((state)=>state.allDogs);
    const allTemperaments=useSelector((state)=>state.allTemperaments);
    const[currentPage,setCurrentPage]=useState(1);
    const[dogsPerPage,SetDogsPerPage]=useState(8);
    const indexOfLastDog=currentPage*dogsPerPage ;
    const indexOfFirstDog=indexOfLastDog-dogsPerPage; 
    const currentDogs=allDogs.slice(indexOfFirstDog,indexOfLastDog);
    const[orden,setOrden]=useState('');

    const paginado=(pageNumber)=>{
        setCurrentPage(pageNumber)
    };

    useEffect(()=>{

        dispatch(getAllDogs());
    },[dispatch])
    useEffect(()=>{

        dispatch(getAllTemperaments());
    },[dispatch])
      function handleFilter(e){
          dispatch(filterDogs(e.target.value))
      };
      function handleFilterOrigen(e){
        dispatch(filterOrigen(e.target.value))
    };
    function handleSort(e){
        e.preventDefault();
        dispatch(order(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    };
   
return(
    
    <div >
        <div>
            <SearchBar/> 
        </div>
        
        <div style={{justifyContent:"center",alignItems:'center',display:'flex'}}>
      <h1 style={{color:"black"}}>Henry Dogs Home</h1>
       </div>
       <Link to='/form'>Crear Dog</Link>
                <div>
                <select onChange={e=>handleSort(e)}>
                    <option value='nameAsc'>Raza Ascendente</option>
                    <option value="nameDesc">Raza Descendente</option>
                    <option value='pesoAsc'>Peso Ascendente</option>
                    <option value="pesoDesc">Peso Descendente</option>
                </select>
                  <select onChange={e=>handleFilter(e)}>
                   { 
                    allTemperaments?.map(el=>{
                        return(
                            <option value={el.name}>{el.name}</option>  
                        )
                    })
                   }
                   
                  </select>

                  <select onChange={e=>handleFilterOrigen(e)}>  
                    <option value="all">Todos</option>
                    <option value="api">Existentes</option>
                    <option value="creados">Creados</option>
                </select> 
                </div>
           <Paginado dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado={paginado}/>                              
         {
                    currentDogs?.map(el=>{
                        return( //aqui el estilo en el div
                            <div>
                                <Link to={"/home/" + el.id}>
                        <Card name={el.name} image={el.image} weight={el.weight} temperament={el.temperament} key={el.id}/>
                        </Link>
                        </div>
                        )})
                }
       
    </div>
   
   )
};

export {Home};
import React from 'react';
import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { getName } from '../Redux/action';


export default function SearchBar() {
    const dispatch=useDispatch();
    const [name, setName] = useState('');
 
    const handleChange = (event) => {
       event.preventDefault()
       setName(event.target.value)
    };
    const handleSubmit = (event) => {
       event.preventDefault()
      dispatch(getName(name))
    };
 
    return(<div >
          <input type='search' placeholder='Buscar...' onChange={(e) => handleChange(e)} value={name}/> 
          <button type='submit' onClick={(e)=> handleSubmit(e)}>Agregar</button> 
       </div> 
    )
 };

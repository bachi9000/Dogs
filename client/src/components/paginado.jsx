import React from "react";


export default function Paginado({dogsPerPage,allDogs,paginado}){
    const pageNumbers=[];
    for(let i=0; i<=Math.ceil(allDogs/dogsPerPage);i++){
        pageNumbers.push(i+1);
    }

    return(//los estilos en el ul
        <nav>
            <ul>
                {pageNumbers &&
                pageNumbers.map(number =>( // en el li estilos
                    <li key={number}>
                    <a onClick={()=> paginado(number)}>{number}</a>
                     </li>   
                    ))}
            </ul>
        </nav>
    )

}



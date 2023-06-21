// import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';



const Inicio=()=>{

    
        // let history = useHistory()
        // const handleClick = () => { 
        //    history.replace('/home') 
        // }
        // console.log(history)
     
    return(
        
        <div style={{justifyContent:"center",alignItems:'center',height:'500px',display:'flex',flexDirection: 'column'}}>
            <h1 style={{color:"white"}}>Henry Dogs</h1>
            <br />
            <button >
            <Link to={`/home`}>Home Page</Link>
            </button>
        </div>
       
       )
};

export {Inicio};


import axios from 'axios';

export const getName = (name)=>{
   
      return async (dispatch) => {
         const {data} = await axios(`http://localhost:3001/dogs?name=`+name);
            return dispatch({
               type: 'GET_NAME',
               payload: data,
            });
      };

};

export function filterDogs(payload){
   return{
       type:'FILTER_DOGS',
       payload
   }
};
export function filterOrigen(payload){
   return{
       type:"FILTER_ORIGEN",
       payload
   }
}
export function order(payload){
   return{
       type:'ORDER',
       payload
   }
}

export const getAllDogs=()=>{
      return async function(dispatch){
         var json =await axios(`http://localhost:3001/dogs`);
         return dispatch({
            type: 'GET_ALL_DOGS',
            payload:json.data
         })
      };

   
};
export const getAllTemperaments=()=>{
   return async function(dispatch){
      var json =await axios(`http://localhost:3001/temperaments`);
      return dispatch({
         type: 'GET_ALL_TEMPS',
         payload:json.data
      })
   };


};
export function postDogs(payload){
   return async function(dispatch){
      const response=await axios.post("http://localhost:3001/dogs",payload)
    return response;
    }


};
export function getDetail(id){
   return async function(dispatch){
     try{
       var json=await axios.get("http://localhost:3001/dogs/"+id)
       return dispatch({
         type:"GET_DETAILS",
         payload:json.data
       })
     } catch(error){
       console.log(error)
     }
   }
 }

const axios = require("axios");
const {Temperaments}= require('../../db');
const {YOUR_API_KEY}=process.env;
const { Op } = require("sequelize");

const getTemperaments= async (req,res)=>{
    try {
    const {data}= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
    const fil=[];
    function filtrarPorTem(obj) {
    if ('temperament' in obj  ) {
    //  fil.push({name:obj.temperament});
    fil.push(obj.temperament);
      return true;
    } else {
      return false;
    }
  }
  let arr=[];
  data.filter(filtrarPorTem);
  for(let i=0; fil.length>i;i++){
    arr=arr.concat(fil[i].split(", "));
  }
//   let aux=[];
//   for(let i=0; arr.length>i;i++){
//    aux.push({name:arr[i]})
//   }
 for(let k=0; arr.length>k;k++){
   let temps= await Temperaments.findOrCreate({
         where:{name:arr[k]}  
     })
    };
    let todos=await Temperaments.findAll()
    res.send(todos);
    }catch(error){
    return res.status(404).send(error.message);
    }
};

module.exports={
    getTemperaments,
};

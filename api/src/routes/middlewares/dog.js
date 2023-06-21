const axios = require("axios");
const {Dogs,Temperaments}= require('../../db');
const {YOUR_API_KEY}=process.env;

    

    const getDogName=async(req,res)=>{

    try{
        const {data}= (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`));
         let arrRazaApi = data.map((el)=>{
          return{
             id:el.id,
              name:el.name,
              image:el.image.url,
              height:el.height.metric,
              weight:el.weight.metric,
              life_span:el.life_span,
              temperament:el.temperament
          }
         })

        const arrRazaDb =await Dogs.findAll({
          include:{
            model: Temperaments,
            attributes:['name'],
            throught:{
              attributes:[],
            }
          }}
        ); 
        let arrRazaAll=arrRazaApi.concat(arrRazaDb);       
        
        return arrRazaAll;
        }catch(error){
            return res.status(404).send('Error en ruta 1 getDogName');
    }
    };
    const getDogId=async(req,res)=>{
  try{
      const {idRaza}=req.params;
      const {data}= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
      function esIdRaza(obj) {
        return obj.id === Number(idRaza);
    }
    const detailApi=data.find(esIdRaza);
    if(detailApi===undefined){
      const detailDb=await Dogs.findAll({
        include:{
          model: Temperaments,
          attributes:['name'],
          throught:{
            attributes:[],
          }},

        where:{
          id:idRaza
        } 
      });
        if(detailDb.length===0){ 
          return res.status(200).send("No existe el id")
        }
      else return res.json(detailDb);
    }
    else {const detail=[{
              id:detailApi.id,
              name:detailApi.name,
              image:detailApi.image.url,
              height:detailApi.height.metric,
              weight:detailApi.weight.metric,
              life_span:detailApi.life_span,
              temperament:detailApi.temperament,}]
    return res.json(detail);}
      }catch(error){
        return res.status(404).send('Error en ruta 2 getDogId');
      }
    };
    const getDogQuery=async(req,res)=>{
      const {name}=req.query;
      try{
        
        let all= await getDogName();
        if(name){

          let dogsName=await all.filter(el=>el.name.toLowerCase().includes(name.toLowerCase()))
          dogsName.length?
          res.status(200).send(dogsName):
          res.status(404).send('Perro no encontrado')

        }
        else 
        res.status(200).send(all);
        
      }catch(error){
        return res.status(404).send('Error en ruta 3 getDogQuery');
      }
    };
    
    const postDog=async(req,res)=>{
        const {name,image,height,weight,life_span,temperament}=req.body; 
        
      try{
         const newDog= await Dogs.create({name,image,height,weight,life_span});
         const temps=await Temperaments.findAll({
          where:{ name: temperament}}
         );
         newDog.addTemperaments(temps);
         
         
         res.status(200).send(newDog);
         
       }catch(error) {
         return res.status(404).send(error.message);
       }
    }; 
   
 module.exports={
     getDogId,
     getDogQuery,
     postDog,
};

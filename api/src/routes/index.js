const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getDogId,getDogQuery,postDog}=require('./middlewares/dog');
const {getTemperaments}=require('./middlewares/temperaments');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/dogs',postDog);
router.get('/dogs',getDogQuery);
router.get('/dogs/:idRaza',getDogId);
router.get('/temperaments',getTemperaments);

module.exports = router;
 
import { Router } from "express";
import { createEncuesta , listarEncuestas , eliminarEncuesta , listarEncuestasGeneral , encuestaEstrutura , guardarRespuesta} from "../Controllers/encuestas.controller.js";

const router = Router();


// TODAS LA RUTAS DE ADMIN ACA (/encuestas) 
router.post('/create', createEncuesta);
router.get('/listar/:id', listarEncuestas);
router.delete('/eliminar/:id', eliminarEncuesta);

//TODA LAS RUTA DE USUARIOS ACA(/encuestas)
router.get('/listarGeneral', listarEncuestasGeneral)
router.get('/listaPorEncuesta/:id_encuesta', encuestaEstrutura)
router.post('/guardarRespuesta' , guardarRespuesta)




export default router;

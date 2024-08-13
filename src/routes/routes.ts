import express from 'express';
import { usuarioController } from '../controllers/usuario.controller';
import { produtoController } from '../controllers/produto.controller';

const rota = express();

rota.use(express.json());

rota.post('/usuarios', usuarioController.create);
rota.get('/usuarios', usuarioController.readAll);
rota.get('/usuarios/:id', usuarioController.readById);
rota.put('/usuarios/:id', usuarioController.update);
rota.delete('/usuarios/:id', usuarioController.delete);


rota.post('/produtos', produtoController.create);
rota.get('/produtos', produtoController.readAll);
rota.get('/produtos/:id', produtoController.readById);
rota.put('/produtos/:id', produtoController.update);
rota.delete('/produtos/:id', produtoController.delete);


export default rota;
